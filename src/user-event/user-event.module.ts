import { Module } from '@nestjs/common';
import { UserEventService } from './user-event.service';
import { UserEventResolver } from './user-event.resolver';

@Module({
  providers: [UserEventResolver, UserEventService]
})
export class UserEventModule {}
