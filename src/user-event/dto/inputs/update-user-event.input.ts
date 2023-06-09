import { Field, InputType } from '@nestjs/graphql';
import { UserEventStatus } from '@prisma/client';

@InputType()
export class UpdateUserEventInput {
  @Field()
  userEventId: string;

  @Field()
  startTime?: Date;

  @Field()
  endTime?: Date;

  @Field()
  status?: UserEventStatus;
}
