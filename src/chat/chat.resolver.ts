import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { ITokenPayload } from 'src/auth/types';
import { Loader } from 'src/dataloader/dataloader';
import { TokenPayload } from 'src/shared/decorators/current-user.decorator';
import { ChatService } from './chat.service';
import { Chat, ChatMember, ChatMessage } from './dto/entities';
import { CreateChatInput, CreateMessageInput } from './dto/inputs';
import { ChatMembersByChatLoader } from './loaders';

@Resolver(() => Chat)
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Mutation(() => Chat)
  async createChat(
    @Args('createChatInput') input: CreateChatInput,
    @TokenPayload() { userId }: ITokenPayload,
  ) {
    return await this.chatService.createChat(input, userId);
  }

  @Mutation(() => ChatMessage)
  async createMessage(
    @Args('createMessageInput') input: CreateMessageInput,
    @TokenPayload() { userId }: ITokenPayload,
  ) {
    return await this.chatService.createMessage(input, userId);
  }

  @ResolveField()
  async chatMembers(
    @Parent() chat: Chat,
    @Loader(ChatMembersByChatLoader) loader: DataLoader<string, ChatMember[]>,
  ) {
    return loader.load(chat.id);
  }
}
