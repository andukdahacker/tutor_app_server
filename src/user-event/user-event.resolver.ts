import { Resolver } from '@nestjs/graphql';
import { UserEventService } from './user-event.service';

@Resolver()
export class UserEventResolver {
  constructor(private readonly userEventService: UserEventService) {}
}
