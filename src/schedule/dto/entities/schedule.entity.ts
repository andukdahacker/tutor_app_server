import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/dto/entities';

@ObjectType()
export class Schedule {
  @Field()
  id: string;

  @HideField()
  userId: string;

  @Field(() => User)
  user: User;
}
