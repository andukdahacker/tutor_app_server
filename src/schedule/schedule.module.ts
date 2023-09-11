import { Module } from '@nestjs/common';
import { ScheduleResolver } from './schedule.controller';
import { ScheduleService } from './schedule.service';

@Module({
  providers: [ScheduleResolver, ScheduleService],
})
export class ScheduleModule {}
