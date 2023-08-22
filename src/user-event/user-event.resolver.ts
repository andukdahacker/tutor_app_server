import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { Loader } from 'src/dataloader/dataloader';
import { Job } from 'src/job/dto/entities';
import { UserEvent } from './dto/entities';
import { CreateUserEventInput } from './dto/inputs';
import { JobByUserEventLoader } from './loaders';
import { UserEventService } from './user-event.service';

@Resolver(UserEvent)
export class UserEventResolver {
  constructor(private readonly userEventService: UserEventService) {}

  @Mutation(() => UserEvent)
  async createUserEvent(
    @Args('createUserEventInput') input: CreateUserEventInput,
  ) {
    return await this.userEventService.createUserEvent(input);
  }

  @ResolveField(() => Job)
  async job(
    @Parent() userEvent: UserEvent,
    @Loader(JobByUserEventLoader) loader: DataLoader<string, Job>,
  ) {
    return loader.load(userEvent.id);
  }
}
