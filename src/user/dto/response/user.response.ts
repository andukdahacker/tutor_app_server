import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/dto/entities/user.entity';

@ObjectType()
export class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => String)
  message: string;
}
