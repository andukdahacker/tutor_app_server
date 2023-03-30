import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { LoginInput } from 'src/auth/dto/inputs/login.input';

@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const args = ctx.getArgs().loginInput as LoginInput;
    const req = ctx.getContext().req;
    const user = await this.authService.validateUser(args.email, args.password);
    delete user['password'];
    req.user = user;
    return true;
  }
}
