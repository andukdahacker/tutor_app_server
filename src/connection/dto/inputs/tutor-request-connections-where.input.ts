import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TutorRequestConnectionWhereInput {
  @Field({ nullable: true })
  tutorId?: string;

  @Field({ nullable: true })
  tutorRequestId?: string;
}
