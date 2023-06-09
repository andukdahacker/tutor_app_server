import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AcceptUserEventInput {
  @Field()
  jobId: string;

  @Field()
  userEventId: string;

  @Field()
  myScheduleId: string;

  @Field()
  otherScheduleId: string;
}
