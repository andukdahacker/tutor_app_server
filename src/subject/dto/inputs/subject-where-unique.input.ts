import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class SubjectWhereUniqueInput {
  @Field(() => Int)
  id: number;
}
