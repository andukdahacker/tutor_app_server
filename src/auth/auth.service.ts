import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import * as argon2 from 'argon2';
import { User } from 'src/user/dto/entities/user.entity';

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

  async login(user: User) {
    if (!user) throw new UnauthorizedException();
    const refreshToken = await this.jwtService.signAsync(
      {
        username: user.username,
        sub: user.id,
      },
      {
        secret: this.configService.get('REFRESH_TOKEN_SECRET') || 'secret',
        expiresIn: '14d',
      },
    );

    await this.userService.upsertRefreshToken(user.id, refreshToken);

    return {
      access_token: await this.jwtService.signAsync({
        username: user.username,
        sub: user.id,
      }),
      refreshToken,
      user,
    };
  }
}
