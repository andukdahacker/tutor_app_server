import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LearnerProfile {
  @Field()
  id: string;

  @Field({ nullable: true })
  bio: string;

  @Field()
  userId: string;
}
