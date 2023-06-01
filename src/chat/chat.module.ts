import { Module } from '@nestjs/common';
import { FileUploadModule } from 'src/file-upload/file-upload.module';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { ChatMessageResolver } from './chat-message.resolver';
import { ChatController } from './chat.controller';
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
    FileUploadService,
  ],
  controllers: [ChatController],
  imports: [FileUploadModule],
})
export class ChatModule {}
