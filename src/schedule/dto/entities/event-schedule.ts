import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { AppEvent } from './app-event.entity';
import { Schedule } from './schedule.entity';

@ObjectType()
export class EventSchedule {
  @HideField()
  scheduleId: string;

  @Field(() => Schedule)
  schedule: Schedule;

  @HideField()
  eventId: string;

  @Field(() => AppEvent)
  event: AppEvent;
}
