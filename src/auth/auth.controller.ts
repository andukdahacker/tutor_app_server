import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';

import { TokenPayload } from 'src/shared/decorators/current-user.decorator';
import { Public } from 'src/shared/decorators/public.decorator';
import { RefreshTokenGuard } from 'src/shared/guards/refresh-token.guard';
import { SignUpInput } from 'src/user/dto/inputs/signup.input';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/inputs/login.input';

import { LoginResponse, SignUpResponse } from './dto/response';

import { BaseResponse } from 'src/shared/types/base_response';
import { UserEntity } from 'src/user/dto/entity/user.entity';
import { ChangePasswordInput } from './dto/inputs';
import { ITokenPayload } from './types/ITokenPayload';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Post('login')
  async login(
    @Body() loginInput: LoginInput,
    @Req() req,
  ): Promise<LoginResponse> {
    const result = await this.authService.login(loginInput);

    this.authService.setAuthCookies(result.refreshToken, req);

    return {
      statusCode: 200,
      data: {
        user: new UserEntity(result.user),
        access_token: result.accessToken,
      },
    };
  }

  @Post('sign-up')
  @Public()
  async signUp(@Body() signUpInput: SignUpInput): Promise<SignUpResponse> {
    const user = await this.authService.signUp(signUpInput);
    return {
      user,
    };
  }

  @Post('refreshToken')
  @Public()
  @UseGuards(RefreshTokenGuard)
  async refreshAccessToken(
    @TokenPayload() user,
  ): Promise<BaseResponse<string>> {
    const accessToken = await this.authService.createAccessToken(
      user.email,
      user.id,
    );

    return {
      statusCode: 200,
      data: accessToken,
    };
  }

  @Post('log-out')
  async logout(@Req() req) {
    await this.authService.logout(req);

    return 'Logged out successfully';
  }

  @Get('me')
  async me(@TokenPayload() payload: ITokenPayload) {
    const userId = payload.userId;

    const user = await this.userService.findOneById(userId);

    if (!user) return null;

    return user;
  }

  @Put('verify-email/:id')
  async verifyEmail(@Param('id') token: string) {
    return await this.authService.verifyEmail(token);
  }

  @Put('forgot-password')
  async forgotPassword(@Body() email: string) {
    return await this.authService.sendForgotPasswordEmail(email);
  }

  @Put('change-password')
  async changePassword(@Body() input: ChangePasswordInput) {
    return await this.authService.changePassword(input);
  }
}
