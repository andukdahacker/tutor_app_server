import { Field, ObjectType } from '@nestjs/graphql';
import { ChatMember } from './chat-member.entity';

@ObjectType()
export class Chat {
  @Field()
  id: string;

  @Field(() => [ChatMember])
  chatMembers: ChatMember[];
}
