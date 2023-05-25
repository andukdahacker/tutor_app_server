import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { NestDataLoader } from 'src/dataloader/dataloader';
import { ChatService } from '../chat.service';
import { ChatMember } from '../dto/entities';

@Injectable()
export class ChatMembersByChatLoader
  implements NestDataLoader<string, ChatMember[]>
{
  constructor(private readonly chatService: ChatService) {}

  generateDataLoader(): DataLoader<string, ChatMember[], string> {
    return new DataLoader<string, ChatMember[]>(
      async (keys: string[]) =>
        await this.chatService.findChatMembersByChatIds(keys),
    );
  }
}
