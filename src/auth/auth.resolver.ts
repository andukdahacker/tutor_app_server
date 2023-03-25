import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/common/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/inputs/login.input';
import { LoginResponse } from './dto/response/login.response';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(@Args('loginInput') _: LoginInput, @Context() context) {
    return this.authService.login(context.user);
  }
}
