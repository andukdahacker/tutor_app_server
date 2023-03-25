import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';

@InputType()
export class SignUpInput extends PartialType(CreateUserInput) {
  @Field()
  passwordRepeat: string;
}
