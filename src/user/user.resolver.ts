import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from './dto/entities/user.entity';
import { UserResponse } from './dto/response/user.response';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async findUserById(@Args('id', { type: () => String }) id: string) {
    return await this.userService.findOneById(id);
  }

  @Query(() => UserResponse)
  async findUserByEmail(
    @Args('email', { type: () => String }) email: string,
  ): Promise<UserResponse> {
    const user = await this.userService.findOneByEmail(email);
    if (!user)
      return {
        message: 'user is not found',
      };
    return {
      user,
      message: 'success',
    };
  }
}
