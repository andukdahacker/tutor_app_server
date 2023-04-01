import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();

    const req = ctx.req;

    const refreshToken = this.extractTokenFromCookie(req);

    if (!refreshToken) throw new UnauthorizedException('No refresh token');

    const user = await this.authService.validateRefreshToken(refreshToken);

    req.user = user;

    return true;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    return request.cookies.Refresh;
  }
}
