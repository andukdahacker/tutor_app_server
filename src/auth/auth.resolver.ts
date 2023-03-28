import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import * as argon2 from 'argon2';
import { CookieAuthGuard } from 'src/shared/guards/cookie-auth.guard';
import { GqlLocalAuthGuard } from 'src/shared/guards/local-auth.guard';
import { User } from 'src/user/dto/entities/user.entity';
import { SignUpInput } from 'src/user/dto/inputs/signup.input';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/inputs/login.input';
import { LoginResponse } from './dto/response/login.response';
import { LogoutResponse } from './dto/response/logout.response';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlLocalAuthGuard)
  login(@Args('loginInput') _: LoginInput, @Context() context) {
    return { user: context.user };
  }

  @Mutation(() => User)
  async signUp(@Args('signUpInput') signUpInput: SignUpInput) {
    const user = await this.userService.findOneByEmail(signUpInput.email);
    if (user)
      throw new HttpException('user existed', HttpStatus.NOT_ACCEPTABLE);
    const hashedPassword = await argon2.hash(signUpInput.password);
    return await this.userService.createOne({
      username: signUpInput.username,
      password: hashedPassword,
      email: signUpInput.email,
    });
  }

  @Mutation(() => LogoutResponse)
  @UseGuards(CookieAuthGuard)
  logout(@Context() context) {
    context.logOut();
    context.session.cookie.maxAge = 0;
    return { user: null };
  }
}
