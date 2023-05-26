import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import DataLoader from 'dataloader';
import { NestDataLoader } from 'src/dataloader/dataloader';
import { ChatService } from '../chat.service';

@Injectable()
export class UserByChatMessageLoader implements NestDataLoader<string, User> {
  constructor(private readonly chatService: ChatService) {}

  generateDataLoader(): DataLoader<string, User, string> {
    return new DataLoader<string, User>(
      async (keys: string[]) => await this.chatService.getUserByChatIds(keys),
    );
  }
}
