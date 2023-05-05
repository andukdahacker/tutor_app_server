import { Field, InputType } from '@nestjs/graphql';
import { JobConnectionType } from '@prisma/client';

@InputType()
export class CreateJobConnectInput {
  @Field()
  jobId: string;

  @Field()
  tutorUserId: string;

  @Field()
  tutorId: string;

  @Field()
  learnerUserId: string;

  @Field()
  type: JobConnectionType;
}
