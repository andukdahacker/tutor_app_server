import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context).getContext();

    const req = ctx.req;

    const accessToken = this.extractTokenFromHeader(req);

    if (!accessToken) throw new UnauthorizedException('No access token');

    const result = this.authService.verifyAccessToken(accessToken);

    if (!result) throw new UnauthorizedException('Invalid access token');

    req.user = result;

    return true;
  }

  private extractTokenFromHeader(request): string | undefined {
    const authorizationToken = request.subscriptions
      ? request.connectionParams.Authorization
      : request.headers.authorization;

    const [type, token] = authorizationToken?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
