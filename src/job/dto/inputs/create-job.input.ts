import { Field, InputType, Int } from '@nestjs/graphql';
import { JobMethod, JobType } from '@prisma/client';
import { GraphQLBigInt } from 'graphql-scalars';

@InputType()
export class CreateJobInput {
  @Field()
  learnerId: string;

  @Field()
  subjectId: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => GraphQLBigInt)
  fee: bigint;

  @Field()
  title: string;

  @Field(() => Int, { nullable: true })
  numberOfSessions?: number;

  @Field()
  jobType: JobType;

  @Field()
  jobMethod: JobMethod;
}
