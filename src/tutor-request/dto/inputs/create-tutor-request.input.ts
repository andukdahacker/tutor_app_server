import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class CreateTutorRequestInput {
  @Field()
  learnerId: string;

  @Field()
  subjectId: string;

  @Field({ nullable: true })
  description?: string;
}
