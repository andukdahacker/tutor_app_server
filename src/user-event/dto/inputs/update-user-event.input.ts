import { Field, InputType } from '@nestjs/graphql';
import { UserEventType } from '../entities/user-event-type.enum';

@InputType()
export class UpdateUserEventInput {
  @Field()
  userEventId: string;

  @Field()
  startTime?: Date;

  @Field()
  endTime?: Date;

  @Field(() => UserEventType, { nullable: true })
  type?: UserEventType;
}
