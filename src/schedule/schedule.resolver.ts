import { Resolver } from '@nestjs/graphql';
import { Schedule } from './dto/entities';
import { ScheduleService } from './schedule.service';

@Resolver(() => Schedule)
export class ScheduleResolver {
  constructor(private readonly scheduleService: ScheduleService) {}
}
