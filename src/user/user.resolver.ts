import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import argon2 from 'argon2';
import { User } from './dto/entities/user.entity';
import { SignUpInput } from './dto/inputs/signup.input';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async findUserById(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOneByid(id);
  }

  @Mutation(() => User)
  async signUp(@Args('signUpInput') signUpInput: SignUpInput) {
    const hashedPassword = await argon2.hash(signUpInput.password);
    return this.userService.createOne({
      username: signUpInput.username,
      password: hashedPassword,
      email: signUpInput.email,
    });
  }
}
