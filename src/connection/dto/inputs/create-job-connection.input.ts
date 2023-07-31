import { Field, InputType } from '@nestjs/graphql';
import { JobConnectionType as JobConnectionTypePrisma } from '@prisma/client';
import { JobConnectionType } from '../entities';

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

  @Field(() => JobConnectionType)
  type: JobConnectionTypePrisma;
}
