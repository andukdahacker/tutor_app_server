import { Field, InputType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class CreateRatingInput {
  @Field()
  @IsNumber()
  score: number;

  @Field()
  raterId: string;

  @Field()
  ratedId: string;

  @Field()
  jobId: string;

  @Field({ nullable: true })
  comment?: string;
}
