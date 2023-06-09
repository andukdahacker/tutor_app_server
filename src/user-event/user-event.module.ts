import { Module } from '@nestjs/common';
import { JobByUserEventLoader } from './loaders';
import { UserEventResolver } from './user-event.resolver';
import { UserEventService } from './user-event.service';

@Module({
  providers: [UserEventResolver, UserEventService, JobByUserEventLoader],
})
export class UserEventModule {}
