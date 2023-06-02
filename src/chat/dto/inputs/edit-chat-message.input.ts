import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EditChatMessageInput {
  @Field()
  chatId: string;

  @Field()
  chatMessageId: string;

  @Field()
  chatMessage: string;
}
