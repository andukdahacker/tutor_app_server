import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { UserEventStatus } from '@prisma/client';
import { Job } from 'src/job/dto/entities';

@ObjectType()
export class UserEvent {
  @Field()
  id: string;

  @Field()
  startTime: Date;

  @Field()
  endTime: Date;

  @HideField()
  jobId?: string;

  @Field({ nullable: true })
  job?: Job;

  @Field()
  userEventStatus: UserEventStatus;
}
