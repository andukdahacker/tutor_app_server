import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Schedule } from 'src/schedule/dto/entities';
import { UserEvent } from './user-event.entitiy';

@ObjectType()
export class UserEventSchedule {
  @Field()
  userEvent: UserEvent;

  @HideField()
  userEventId: string;

  @Field()
  schedule: Schedule;

  @HideField()
  scheduleId: string;
}
