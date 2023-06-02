import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteChatMessageInput {
  @Field()
  chatId: string;

  @Field()
  chatMessageId: string;
}
