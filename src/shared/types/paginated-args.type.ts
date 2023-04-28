import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PaginatedArgs {
  @Field(() => Int)
  take: number;

  @Field(() => Int, { nullable: true })
  intCursor?: number;

  @Field({ nullable: true })
  stringCursor?: string;
}
