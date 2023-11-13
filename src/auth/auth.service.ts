import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { Request, Response } from 'express';

import { Redis } from 'ioredis';
import { Environment } from 'src/config/env.validation';
import { MailerService } from 'src/mailer/mailer.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { REDIS } from 'src/redis/redis.module';
import { SignUpInput } from 'src/user/dto/inputs';
import { UserService } from 'src/user/user.service';
import { v4 as uuidv4 } from 'uuid';
import {
  EMAIL_VERIFICATION_PREFIX,
  EMAIL_VERIFICATION_SUBJECT,
  FORGOT_PASSWORD_PREFIX,
  FORGOT_PASSWORD_SUBJECT,
  REFRESH_TOKEN_PREFIX,
} from './auth.constants';
import { ChangePasswordInput, LoginInput } from './dto/inputs';
import { ITokenPayload } from './types';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
    private readonly prisma: PrismaService,
    @Inject(REDIS) private readonly redis: Redis,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) throw new UnauthorizedException('User is not found');

    const passwordIsValid = await argon2.verify(user.password, pass);

    if (!passwordIsValid)
      throw new UnauthorizedException('Password is not correct');

    return user;
  }

  async signUp(signUpInput: SignUpInput) {
    const user = await this.userService.findOneByEmail(signUpInput.email);
    if (user) throw new UnauthorizedException('User already exist');
    const hashedPassword = await argon2.hash(signUpInput.password);

    const newUser = await this.userService.createOne({
      username: signUpInput.username,
      password: hashedPassword,
      email: signUpInput.email,
    });

    await this.prisma.learnerProfile.create({
      data: {
        user: {
          connect: {
            id: newUser.id,
          },
        },
      },
    });

    if (!newUser) throw new InternalServerErrorException();

    return newUser;
  }

  async login(loginInput: LoginInput) {
    const user = await this.validateUser(loginInput.email, loginInput.password);
    const refreshToken = this.createRefreshToken(user.email, user.id);
    const accessToken = this.createAccessToken(user.email, user.id);

    const saveRefreshToken = this.redis.set(
      REFRESH_TOKEN_PREFIX + refreshToken,
      user.id,
    );

    const environment = this.configService.get('NODE_ENV') as Environment;

    if (!user.isVerified && environment == Environment.Production) {
      await this.sendAccountValidationEmail(user.id, user.email);
    }

    const result = await Promise.all([
      refreshToken,
      accessToken,
      saveRefreshToken,
    ]);

    return { accessToken: result[1], refreshToken: result[0], user };
  }

  async sendAccountValidationEmail(userId: string, email: string) {
    const token = uuidv4();
    const url = this.configService.get('CLIENT');

    try {
      await this.redis.set(
        EMAIL_VERIFICATION_PREFIX + token,
        userId,
        'EX',
        1000 * 60 * 60,
      );

      const emailVerificationURL = `${url}/verify-email/${token}`;

      const sendMailResult = await this.mailerService.sendMail({
        from: 'me',
        to: email,
        subject: EMAIL_VERIFICATION_SUBJECT,
        html: ` <p>Click the link below to confirm your email address</p>
        <a href=${emailVerificationURL} clicktracking=off>${emailVerificationURL}</a>`,
      });

      if (sendMailResult.status != 200) {
        throw new InternalServerErrorException();
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async sendForgotPasswordEmail(email: string) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) throw new UnauthorizedException('User is not found');

    const token = uuidv4();
    const url = this.configService.get('CLIENT');

    await this.redis.set(
      FORGOT_PASSWORD_PREFIX + token,
      user.id,
      'EX',
      1000 * 60 * 60,
    );

    const changePasswordURL = `${url}/forgot-password/${token}`;

    const result = await this.mailerService.sendMail({
      from: 'me',
      to: email,
      subject: FORGOT_PASSWORD_SUBJECT,
      html: `
      <h1>You have requested a password reset</h1>
      <p>Click the link below to continue the process</p>
      <a href=${changePasswordURL} clicktracking=off>${changePasswordURL}</a>
      `,
    });

    if (!result) return false;

    return true;
  }

  async changePassword(input: ChangePasswordInput) {
    const userId = await this.redis.get(FORGOT_PASSWORD_PREFIX + input.token);

    if (!userId) throw new UnauthorizedException('User is not found');

    const hashedPassword = await argon2.hash(input.password);

    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
      },
    });
  }

  async verifyEmail(token: string) {
    const userId = await this.redis.get(EMAIL_VERIFICATION_PREFIX + token);

    if (!userId) throw new UnauthorizedException('User is not found');

    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isVerified: true,
      },
    });

    await this.redis.del(EMAIL_VERIFICATION_PREFIX + token);

    return user;
  }

  async validateRefreshToken(refreshToken: string) {
    const userId = await this.redis.get(REFRESH_TOKEN_PREFIX + refreshToken);

    if (!userId) throw new UnauthorizedException('No refresh token');
    const user = await this.userService.findOneById(userId);

    if (!user) throw new UnauthorizedException('Invalid refresh token');
    return user;
  }

  verifyAccessToken(access_token: string) {
    const result = this.jwtService.verify<ITokenPayload>(access_token, {
      secret: this.configService.get('ACCESS_TOKEN_SECRET'),
    });

    if (!result) throw new UnauthorizedException('Invalid access token');

    return result;
  }

  async createAccessToken(email: string, id: string) {
    return await this.jwtService.signAsync(
      { userId: id, sub: email },
      {
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRATION_TIME'),
      },
    );
  }

  async createRefreshToken(email: string, id: string) {
    const tokenPayload = {
      userId: id,
      sub: email,
    };

    return await this.jwtService.signAsync(tokenPayload, {
      secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRATION_TIME'),
    });
  }

  async logout(req: Request) {
    const refreshToken = req.cookies.Refresh;

    await this.redis.del([REFRESH_TOKEN_PREFIX + refreshToken]);

    this.resetAuthCookies(req.res);
  }

  setAuthCookies(refreshToken: string, req: Request) {
    const environment = this.configService.get('NODE_ENV') as Environment;

    req.res.cookie('Refresh', refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      secure: environment === Environment.Production ? true : false,
      sameSite: environment === Environment.Production ? 'none' : 'lax',
    });
  }

  resetAuthCookies(res: Response) {
    res.clearCookie(
      this.configService.get<string>('REFRESH_TOKEN_COOKIE_NAME'),
    );
  }
}
