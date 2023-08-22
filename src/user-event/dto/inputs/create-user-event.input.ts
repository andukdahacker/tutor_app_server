import { Field, InputType } from '@nestjs/graphql';
import { UserEventType } from '../entities/user-event-type.enum';

@InputType()
export class CreateUserEventInput {
  @Field()
  jobId: string;

  @Field()
  startTime: Date;

  @Field()
  endTime: Date;

  @Field(() => UserEventType)
  type: UserEventType;
}
