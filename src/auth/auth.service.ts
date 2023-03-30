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

import { UserService } from 'src/user/user.service';

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

  getCookieWithJwtAccessToken(token: string) {
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    )}`;
  }

  getCookieWithJwtRefreshToken(token: string) {
    return `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    )}`;
  }

  async validateRefreshToken(refreshToken: string) {
    const user = await this.userService.findOneByRefreshToken(refreshToken);

    if (!user) throw new UnauthorizedException('Invalid refresh token');
    return user;
  }

  async verifyAccessToken(access_token: string) {
    const result = await this.jwtService.verifyAsync(access_token, {
      secret: this.configService.get('ACCESS_TOKEN_SECRET'),
    });

    if (!result) throw new UnauthorizedException();

    return result;
  }

  async createAccessToken(username: string, id: string) {
    return await this.jwtService.signAsync(
      {
        username: username,
        sub: id,
      },
      {
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
      },
    );
  }

  async createRefreshToken(username: string, id: string) {
    return await this.jwtService.signAsync(
      {
        username: username,
        sub: id,
      },
      {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
      },
    );
  }

  setAuthCookie(accessToken: string, refreshToken: string, context: any) {
    const accessTokenCookie = this.getCookieWithJwtAccessToken(accessToken);

    const refreshTokenCookie = this.getCookieWithJwtRefreshToken(refreshToken);

    context.req.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
  }
}
