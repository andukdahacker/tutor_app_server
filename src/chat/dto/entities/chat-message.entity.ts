import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/dto/entities';
import { Chat } from './chat.entity';

@ObjectType()
export class ChatMessage {
  @Field()
  id: string;

  @HideField()
  authorId: string;

  @Field()
  author: User;

  @HideField()
  chatId: string;

  @Field()
  chat: Chat;

  @Field()
  content: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
