import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import DataLoader from 'dataloader';
import { Loader } from 'src/dataloader/dataloader';
import { ChatService } from './chat.service';
import { ChatMessage } from './dto/entities';
import { UserByChatMessageLoader } from './loaders';

@Resolver(() => ChatMessage)
export class ChatMessageResolver {
  constructor(private readonly chatService: ChatService) {}

  @ResolveField()
  author(
    @Parent() chatMessage: ChatMessage,
    @Loader(UserByChatMessageLoader) loader: DataLoader<string, User>,
  ) {
    return loader.load(chatMessage.chatId);
  }
}
