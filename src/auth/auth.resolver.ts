import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from '@prisma/client';
import { TokenPayload } from 'src/shared/decorators/current-user.decorator';
import { Public } from 'src/shared/decorators/public.decorator';
import { RefreshTokenGuard } from 'src/shared/guards/refresh-token.guard';
import { SignUpInput } from 'src/user/dto/inputs/signup.input';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/inputs/login.input';

import {
  LoginResponse,
  LogoutResponse,
  MeResponse,
  RefreshAccessTokenResponse,
  SignUpResponse,
} from './dto/response';

import { ITokenPayload } from './types/ITokenPayload';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

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
    @TokenPayload() user: User,
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
    await this.authService.logout(context);

    return {
      message: 'Logged out successfully',
    };
  }

  @Query(() => MeResponse)
  async me(@TokenPayload() payload: ITokenPayload) {
    const userId = payload.userId;

    const user = await this.userService.findOneById(userId);

    if (!user) return null;

    return { user };
  }
}
