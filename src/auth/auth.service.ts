import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import * as argon2 from 'argon2';

import { SignUpInput } from 'src/user/dto/inputs/signup.input';

import { Response } from 'express';
import { GraphQLError } from 'graphql';
import { SendGridService } from 'src/sendgrid/sendgrid.service';
import { UserService } from 'src/user/user.service';
import { LoginInput } from './dto/inputs/login.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly sendGridService: SendGridService,
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
    if (user)
      throw new GraphQLError('User already exists', {
        extensions: {
          code: 203,
        },
      });
    const hashedPassword = await argon2.hash(signUpInput.password);

    const newUser = await this.userService.createOne({
      username: signUpInput.username,
      password: hashedPassword,
      email: signUpInput.email,
    });

    if (!newUser) throw new InternalServerErrorException();

    return newUser;
  }

  async login(loginInput: LoginInput) {
    const user = await this.validateUser(loginInput.email, loginInput.password);
    const refreshToken = await this.createRefreshToken(user.email, user.id);
    const accessToken = await this.createAccessToken(user.email, user.id);

    const updatedUser = await this.userService.upsertRefreshToken(
      user.id,
      refreshToken,
    );

    return { accessToken, refreshToken, user: updatedUser };
  }

  async validateRefreshToken(refreshToken: string) {
    const user = await this.userService.findOneByRefreshToken(refreshToken);

    if (!user) throw new UnauthorizedException('Invalid refresh token');
    return user;
  }

  verifyAccessToken(access_token: string) {
    const result = this.jwtService.verify(access_token, {
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

  async logout(userId: string, context: any) {
    await this.userService.removeUserRefreshToken(userId);

    this.resetAuthCookies(context);
  }

  setAuthCookies(refreshToken: string, context: any) {
    (context.req.res as Response).cookie('Refresh', refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      secure: false,
      sameSite: 'lax',
    });
  }

  resetAuthCookies(context: any) {
    (context.req.res as Response).clearCookie(
      this.configService.get<string>('REFRESH_TOKEN_COOKIE_NAME'),
    );
  }
}
