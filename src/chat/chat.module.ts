import { Module } from '@nestjs/common';
import { ChatResolver } from './chat.resolver';
import { ChatService } from './chat.service';
import { ChatMembersByChatLoader } from './loaders';

@Module({
  providers: [ChatResolver, ChatService, ChatMembersByChatLoader],
})
export class ChatModule {}
