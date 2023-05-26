import { Injectable } from '@nestjs/common';
import { ChatMessage } from '@prisma/client';
import DataLoader from 'dataloader';
import { NestDataLoader } from 'src/dataloader/dataloader';
import { ChatService } from '../chat.service';

@Injectable()
export class ChatMessagesByChatLoader
  implements NestDataLoader<string, ChatMessage[]>
{
  constructor(private readonly chatService: ChatService) {}

  generateDataLoader(): DataLoader<string, ChatMessage[], string> {
    return new DataLoader<string, ChatMessage[]>(
      async (keys: string[]) =>
        await this.chatService.getChatMessagesByChatIds(keys),
    );
  }
}
