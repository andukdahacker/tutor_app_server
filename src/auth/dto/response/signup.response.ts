import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/dto/entities/user.entity';

@ObjectType()
export class SignUpResponse {
  @Field(() => User)
  user: User;
}
