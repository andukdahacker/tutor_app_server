import { Field, HideField, Int, ObjectType } from '@nestjs/graphql';
import { Job } from 'src/job/dto/entities';
import { User } from 'src/user/dto/entities';

@ObjectType()
export class Rating {
  @Field(() => Int)
  score: number;

  @Field({ nullable: true })
  comment?: string;

  @Field(() => User)
  rater: User;

  @HideField()
  raterId: string;

  @Field(() => User)
  rated: User;

  @HideField()
  ratedId: string;

  @Field(() => Job)
  job: Job;

  @HideField()
  jobId: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
