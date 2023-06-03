import { Module } from '@nestjs/common';
import { EventScheduleService } from './event-schedule.service';
import { EventScheduleResolver } from './event-schedule.resolver';

@Module({
  providers: [EventScheduleResolver, EventScheduleService]
})
export class EventScheduleModule {}
