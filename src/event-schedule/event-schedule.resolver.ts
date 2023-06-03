import { Resolver } from '@nestjs/graphql';
import { EventScheduleService } from './event-schedule.service';

@Resolver()
export class EventScheduleResolver {
  constructor(private readonly eventScheduleService: EventScheduleService) {}
}
