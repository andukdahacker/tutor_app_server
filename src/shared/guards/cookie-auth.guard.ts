import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class CookieAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = GqlExecutionContext.create(context).getContext().req;
    console.log('cookie guard', request.isAuthenticated());
    return request.isAuthenticated();
  }
}
