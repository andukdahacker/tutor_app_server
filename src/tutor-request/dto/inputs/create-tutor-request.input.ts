import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class CreateTutorRequestInput {
  @Field()
  learnerId: string;

  @Field()
  subjectId: number;
}
