import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TutorProfileWhereManyInput {
  @Field()
  searchString: string;
}
