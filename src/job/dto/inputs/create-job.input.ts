import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class CreateJobInput {
  @Field()
  learnerId: string;

  @Field()
  subjectId: string;

  @Field({ nullable: true })
  description?: string;
}
