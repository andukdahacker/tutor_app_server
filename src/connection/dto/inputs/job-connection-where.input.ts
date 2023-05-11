import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobConnectionWhereInput {
  @Field({ nullable: true })
  tutorId?: string;

  @Field({ nullable: true })
  jobId?: string;
}
