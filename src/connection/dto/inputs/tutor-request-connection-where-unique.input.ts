import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TutorRequestConnectionWhereUniqueInput {
  @Field()
  tutorRequestId: string;

  @Field()
  tutorId: string;
}
