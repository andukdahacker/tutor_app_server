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

import { LoginResponse } from './dto/response';

import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorResponse } from 'src/shared/types/error_response';
import { UserEntity } from 'src/user/dto/entity/user.entity';
import { ChangePasswordInput } from './dto/inputs';
import { RefreshTokenResponse } from './dto/response/refresh-token.response';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Post('login')
  @ApiOkResponse({ type: LoginResponse })
  @ApiUnauthorizedResponse({ type: () => ErrorResponse })
  async login(
    @Body() loginInput: LoginInput,
    @Req() req,
  ): Promise<LoginResponse> {
    const result = await this.authService.login(loginInput);

    this.authService.setAuthCookies(result.refreshToken, req);

    return {
      user: new UserEntity(result.user),
      access_token: result.accessToken,
    };
  }

  @Post('sign-up')
  @Public()
  @ApiOkResponse({ type: UserEntity })
  @ApiUnauthorizedResponse({ type: ErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  async signUp(@Body() signUpInput: SignUpInput): Promise<UserEntity> {
    const user = await this.authService.signUp(signUpInput);
    return user;
  }

  @Post('refreshToken')
  @Public()
  @UseGuards(RefreshTokenGuard)
  @ApiOkResponse({ type: RefreshTokenResponse })
  async refreshAccessToken(
    @TokenPayload() user,
  ): Promise<RefreshTokenResponse> {
    const accessToken = await this.authService.createAccessToken(
      user.email,
      user.id,
    );

    return {
      accessToken,
    };
  }

  @Post('logOut')
  @ApiOkResponse()
  async logout(@Req() req) {
    return await this.authService.logout(req);
  }

  @Get('me')
  @ApiOkResponse({ type: UserEntity })
  @ApiUnauthorizedResponse({ type: () => ErrorResponse })
  async me(@Req() req) {
    const userId = req.user.userId;

    const user = await this.userService.findOneById(userId);

    if (!user) return null;

    return new UserEntity(user);
  }

  @Put('verify-email/:id')
  @ApiOkResponse({ type: UserEntity })
  async verifyEmail(@Param('id') token: string) {
    const user = await this.authService.verifyEmail(token);

    return user;
  }

  @Put('forgot-password')
  @ApiOkResponse({ type: Boolean })
  async forgotPassword(@Body() email: string) {
    return await this.authService.sendForgotPasswordEmail(email);
  }

  @Put('change-password')
  @ApiOkResponse()
  async changePassword(@Body() input: ChangePasswordInput) {
    return await this.authService.changePassword(input);
  }
}
