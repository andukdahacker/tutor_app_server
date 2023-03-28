import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from './dto/entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async findUserById(@Args('id', { type: () => String }) id: string) {
    return await this.userService.findOneById(id);
  }

  @Query(() => User)
  async findUserByEmail(@Args('email', { type: () => String }) email: string) {
    return await this.userService.findOneByEmail(email);
  }
}
