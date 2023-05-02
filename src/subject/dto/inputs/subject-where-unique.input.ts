import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SubjectWhereUniqueInput {
  @Field()
  id: string;
}
