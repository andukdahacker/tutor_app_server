import { Module } from '@nestjs/common';
import { FileUploadModule } from 'src/file-upload/file-upload.module';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { ChatMessageController } from './chat-message.controller';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  providers: [ChatService, ChatMessageController, FileUploadService],
  controllers: [ChatController],
  imports: [FileUploadModule],
})
export class ChatModule {}
