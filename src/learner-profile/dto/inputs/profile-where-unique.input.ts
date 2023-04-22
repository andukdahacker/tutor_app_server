import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProfileWhereUniqueInput {
  @Field()
  id: string;
}
