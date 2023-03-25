import { BadRequestException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import * as argon2 from 'argon2';
import { User } from './dto/entities/user.entity';
import { SignUpInput } from './dto/inputs/signup.input';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async findUserById(@Args('id', { type: () => String }) id: string) {
    return await this.userService.findOneByid(id);
  }

  @Query(() => User)
  async findUserByEmail(@Args('email', { type: () => String }) email: string) {
    return await this.userService.findOneByEmail(email);
  }

  @Mutation(() => User)
  async signUp(@Args('signUpInput') signUpInput: SignUpInput) {
    const user = await this.userService.findOneByEmail(signUpInput.email);
    if (user) throw new BadRequestException('user existed');
    const hashedPassword = await argon2.hash(signUpInput.password);
    return await this.userService.createOne({
      username: signUpInput.username,
      password: hashedPassword,
      email: signUpInput.email,
    });
  }
}
