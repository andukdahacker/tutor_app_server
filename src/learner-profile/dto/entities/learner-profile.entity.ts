import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/dto/entities';

@ObjectType()
export class LearnerProfile {
  @Field()
  id: string;

  @Field({ nullable: true })
  bio: string;

  @Field()
  userId: string;

  @Field(() => User)
  user: User;
}
