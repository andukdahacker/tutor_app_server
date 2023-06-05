import { Field, ObjectType } from '@nestjs/graphql';
import { UserEventType } from '@prisma/client';
import { Job } from 'src/job/dto/entities';

@ObjectType()
export class UserEvent {
  @Field()
  id: string;

  @Field()
  startTime: Date;

  @Field()
  endTime: Date;

  @Field({ nullable: true })
  jobId?: string;

  @Field({ nullable: true })
  job?: Job;

  @Field()
  userEventType: UserEventType;
}
