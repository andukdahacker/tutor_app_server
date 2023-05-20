import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteRatingInput {
  @Field()
  jobId: string;

  @Field()
  raterId: string;

  @Field()
  ratedId: string;
}
