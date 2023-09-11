import { Controller } from '@nestjs/common';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleResolver {
  constructor(private readonly scheduleService: ScheduleService) {}
}
