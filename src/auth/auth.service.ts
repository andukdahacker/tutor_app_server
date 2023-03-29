import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as argon2 from 'argon2';
import { User } from 'src/user/dto/entities/user.entity';

import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) throw new UnauthorizedException('User is not found');

    const passwordIsValid = await argon2.verify(user.password, pass);

    if (!passwordIsValid)
      throw new UnauthorizedException('Password is not correct');

    return user;
  }

  login(user: User) {
    if (!user) return null;
    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
      user,
    };
  }
}
