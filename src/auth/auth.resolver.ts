import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { User } from '@prisma/client';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { Public } from 'src/shared/decorators/public.decorator';
import { RefreshTokenGuard } from 'src/shared/guards/refresh-token.guard';
import { SignUpInput } from 'src/user/dto/inputs/signup.input';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/inputs/login.input';
import { LoginResponse } from './dto/response/login.response';
import { LogoutResponse } from './dto/response/logout.response';
import { RefreshAccessTokenResponse } from './dto/response/refresh-access-token.response';
import { SignUpResponse } from './dto/response/signup.response';
import { ITokenPayload } from './types/ITokenPayload';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @Public()
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() context,
  ): Promise<LoginResponse> {
    const result = await this.authService.login(loginInput);

    this.authService.setAuthCookies(result.refreshToken, context);

    return {
      user: result.user,
      access_token: result.accessToken,
    };
  }

  @Mutation(() => SignUpResponse)
  @Public()
  async signUp(
    @Args('signUpInput') signUpInput: SignUpInput,
  ): Promise<SignUpResponse> {
    const user = await this.authService.signUp(signUpInput);

    return {
      user,
    };
  }

  @Mutation(() => RefreshAccessTokenResponse)
  @Public()
  @UseGuards(RefreshTokenGuard)
  async refreshAccessToken(
    @CurrentUser() user: User,
  ): Promise<RefreshAccessTokenResponse> {
    const accessToken = await this.authService.createAccessToken(
      user.email,
      user.id,
    );

    return {
      access_token: accessToken,
    };
  }

  @Mutation(() => LogoutResponse)
  async logout(@Context() context): Promise<LogoutResponse> {
    await this.authService.logout(
      (context.req.user as ITokenPayload).userId,
      context,
    );

    return {
      message: 'Logged out successfully',
    };
  }
}
