import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Public } from 'src/common/decorators/public.decorator';
import { GqlLocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/inputs/login.input';
import { LoginResponse } from './dto/response/login.response';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @Public()
  @UseGuards(GqlLocalAuthGuard)
  login(@Args('loginInput') _: LoginInput, @Context() context) {
    return this.authService.login(context.user);
  }
}
