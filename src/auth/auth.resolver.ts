import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { Public } from 'src/shared/decorators/public.decorator';
import { LocalAuthGuard } from 'src/shared/guards/local-auth.guard';
import { RefreshTokenGuard } from 'src/shared/guards/refresh-token.guard';
import { User } from 'src/user/dto/entities/user.entity';
import { SignUpInput } from 'src/user/dto/inputs/signup.input';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/inputs/login.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  @UseGuards(LocalAuthGuard)
  @Public()
  async login(@Args('loginInput') _: LoginInput, @Context() context) {
    const result = await this.authService.login(context.req.user);

    this.authService.setAuthCookie(
      result.accessToken,
      result.refreshToken,
      context,
    );

    return result.user;
  }

  @Mutation(() => User)
  @Public()
  async signUp(@Args('signUpInput') signUpInput: SignUpInput) {
    return await this.authService.signUp(signUpInput);
  }

  @Mutation(() => User)
  @Public()
  @UseGuards(RefreshTokenGuard)
  async refreshAccessToken(@Context() context) {
    const accessToken = this.authService.createAccessToken(
      context.req.user.username,
      context.req.user.id,
    );
    context.req.res.setHeader('Set-Cookie', [accessToken]);

    return context.req.user;
  }
}
