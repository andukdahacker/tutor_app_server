import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import * as argon2 from 'argon2';
import { Response } from 'express';
import { Public } from 'src/shared/decorators/public.decorator';
import { GqlLocalAuthGuard } from 'src/shared/guards/local-auth.guard';
import { User } from 'src/user/dto/entities/user.entity';
import { SignUpInput } from 'src/user/dto/inputs/signup.input';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/inputs/login.input';
import { LoginResponse } from './dto/response/login.response';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => LoginResponse)
  @Public()
  @UseGuards(GqlLocalAuthGuard)
  async login(@Args('loginInput') _: LoginInput, @Context() context) {
    const result = await this.authService.login(context.user);
    (context.res as Response).cookie('tutor_app_rt', result.refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 14,
    });

    return result;
  }

  @Mutation(() => User)
  @Public()
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
}
