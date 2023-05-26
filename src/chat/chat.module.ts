import { Module } from '@nestjs/common';
import { ChatMessageResolver } from './chat-message.resolver';
import { ChatResolver } from './chat.resolver';
import { ChatService } from './chat.service';
import {
  ChatMembersByChatLoader,
  ChatMessagesByChatLoader,
  UserByChatMessageLoader,
} from './loaders';

@Module({
  providers: [
    ChatResolver,
    ChatService,
    ChatMembersByChatLoader,
    ChatMessagesByChatLoader,
    ChatMessageResolver,
    UserByChatMessageLoader,
  ],
})
export class ChatModule {}
