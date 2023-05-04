import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobConnectionWhereUniqueInput {
  @Field()
  jobId: string;

  @Field()
  tutorId: string;
}
