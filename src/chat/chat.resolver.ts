import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { ITokenPayload } from 'src/auth/types';
import { Loader } from 'src/dataloader/dataloader';
import { TokenPayload } from 'src/shared/decorators/current-user.decorator';
import { paginate } from 'src/shared/utils/pagination.utils';
import { ChatService } from './chat.service';
import { Chat, ChatMember, ChatMessage } from './dto/entities';
import {
  CreateChatInput,
  CreateMessageInput,
  GetChatMessagesInput,
  GetChatsInput,
} from './dto/inputs';
import { GetChatsResponse, GetMessagesResponse } from './dto/response';
import { ChatMembersByChatLoader, ChatMessagesByChatLoader } from './loaders';

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

  @Query(() => GetChatsResponse)
  async chats(
    @Args('getChatInput') input: GetChatsInput,
    @TokenPayload() { userId }: ITokenPayload,
  ) {
    const chats = await this.chatService.getChats(input, userId);
    return await paginate(
      chats,
      'id',
      async (cursor: string) =>
        await this.chatService.getChats(
          { stringCursor: cursor, ...input },
          userId,
        ),
    );
  }

  @Query(() => GetMessagesResponse)
  async messages(@Args('getChatMessagesInput') input: GetChatMessagesInput) {
    const messages = await this.chatService.getChatMessages(input);

    return await paginate(
      messages,
      'id',
      async (cursor: string) =>
        await this.chatService.getChatMessages({
          stringCursor: cursor,
          ...input,
        }),
    );
  }

  @ResolveField()
  async chatMembers(
    @Parent() chat: Chat,
    @Loader(ChatMembersByChatLoader) loader: DataLoader<string, ChatMember[]>,
  ) {
    return loader.load(chat.id);
  }

  @ResolveField()
  async chatMessages(
    @Parent() chat: Chat,
    @Loader(ChatMessagesByChatLoader) loader: DataLoader<string, ChatMessage[]>,
  ) {
    return loader.load(chat.id);
  }
}
