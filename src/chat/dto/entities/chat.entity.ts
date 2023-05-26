import { Field, ObjectType } from '@nestjs/graphql';
import { ChatMember } from './chat-member.entity';
import { ChatMessage } from './chat-message.entity';

@ObjectType()
export class Chat {
  @Field()
  id: string;

  @Field(() => [ChatMember])
  chatMembers: ChatMember[];

  @Field(() => [ChatMessage], { nullable: 'itemsAndList' })
  chatMessages: ChatMessage[];

  @Field()
  updatedAt: Date;
}
