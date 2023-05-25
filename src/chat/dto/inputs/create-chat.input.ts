import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateChatInput {
  @Field()
  receiverId: string;

  @Field({ nullable: true })
  message?: string;
}
