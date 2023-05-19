import { Field, InputType, Int } from '@nestjs/graphql';
import { JobMethod, JobType } from '@prisma/client';

@InputType()
export class CreateJobInput {
  @Field()
  learnerId: string;

  @Field()
  subjectId: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int)
  fee: number;

  @Field()
  title: string;

  @Field()
  jobType: JobType;

  @Field()
  jobMethod: JobMethod;
}
