import { Controller } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // @Post('create-message-file')
  // @UseInterceptors(FilesInterceptor('files'))
  // async createMessageWithFile(
  //   @UploadedFiles() files: Array<Express.Multer.File>,
  // ) {}
}