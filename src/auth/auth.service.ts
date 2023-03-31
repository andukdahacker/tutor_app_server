import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import * as argon2 from 'argon2';
import { User } from 'src/user/dto/entities/user.entity';

import { SignUpInput } from 'src/user/dto/inputs/signup.input';

import { Response } from 'express';
import { UserService } from 'src/user/user.service';
import { ITokenPayload } from './types/ITokenPayload';
import { JwtSignInput } from './types/jwtSignInput';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
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
      throw new HttpException('user existed', HttpStatus.NOT_ACCEPTABLE);
    const hashedPassword = await argon2.hash(signUpInput.password);

    const newUser = await this.userService.createOne({
      username: signUpInput.username,
      password: hashedPassword,
      email: signUpInput.email,
    });

    if (!newUser) throw new InternalServerErrorException();

    return newUser;
  }

  async login(user: User) {
    const refreshToken = await this.createRefreshToken(user.username, user.id);
    const accessToken = await this.createAccessToken(user.username, user.id);

    const updatedUser = await this.userService.upsertRefreshToken(
      user.id,
      refreshToken,
    );

    return { accessToken, refreshToken, user: updatedUser };
  }

  // getCookieWithJwtRefreshToken(token: string) {
  //   return `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
  //     'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
  //   )}`;
  // }

  async validateRefreshToken(refreshToken: string) {
    const user = await this.userService.findOneByRefreshToken(refreshToken);

    if (!user) throw new UnauthorizedException('Invalid refresh token');
    return user;
  }

  verifyAccessToken(access_token: string) {
    const result = this.jwtService.verify<ITokenPayload>(access_token, {
      secret: this.configService.get('ACCESS_TOKEN_SECRET'),
    });

    if (!result) throw new UnauthorizedException();

    return result;
  }

  async createAccessToken(username: string, id: string) {
    const tokenPayload: JwtSignInput = {
      username,
      userId: id,
    };
    return await this.jwtService.signAsync(tokenPayload, {
      secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
    });
  }

  async createRefreshToken(username: string, id: string) {
    const tokenPayload: JwtSignInput = {
      username,
      userId: id,
    };
    return await this.jwtService.signAsync(tokenPayload, {
      secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
    });
  }

  async logout(userId: string, context: any) {
    await this.userService.removeUserRefreshToken(userId);

    this.resetAuthCookies(context);
  }

  setAuthCookies(refreshToken: string, context: any) {
    (context.req.res as Response).cookie('Refresh', refreshToken, {
      httpOnly: true,
    });
  }

  resetAuthCookies(context: any) {
    (context.req.res as Response).clearCookie('Refresh');
  }
}
