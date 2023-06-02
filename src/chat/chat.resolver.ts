import { Inject } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { ITokenPayload } from 'src/auth/types';
import { Loader } from 'src/dataloader/dataloader';
import { NewChatMessageEvent } from 'src/notification/notification.constants';
import { PUB_SUB } from 'src/pub-sub/pub-sub.module';
import { TokenPayload } from 'src/shared/decorators/current-user.decorator';
import { paginate } from 'src/shared/utils/pagination.utils';
import { ChatService } from './chat.service';
import { Chat, ChatMember, ChatMessage } from './dto/entities';
import {
  CreateChatInput,
  CreateMessageInput,
  DeleteChatMessageInput,
  EditChatMessageInput,
  GetChatMessagesInput,
  GetChatsInput,
} from './dto/inputs';
import { GetChatsResponse, GetMessagesResponse } from './dto/response';
import { ChatMembersByChatLoader, ChatMessagesByChatLoader } from './loaders';
import { CreateChatMessagePayload } from './types/create-chat-message-payload.type';

@Resolver(() => Chat)
export class ChatResolver {
  constructor(
    private readonly chatService: ChatService,
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
  ) {}

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
    const result = await this.chatService.createMessage(input, userId);
    this.pubSub.publish(NewChatMessageEvent, result);
    return result.message;
  }

  @Mutation(() => ChatMessage)
  async editChatMessage(
    @Args('editChatMessageInput') input: EditChatMessageInput,
  ) {
    return await this.chatService.editChatMessage(input);
  }

  @Mutation(() => ChatMessage)
  async deleteChatMessage(
    @Args('deleteChatMessageInput') input: DeleteChatMessageInput,
  ) {
    return await this.chatService.deleteChatMessage(input);
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

  @Subscription(() => ChatMessage, {
    resolve: (payload: CreateChatMessagePayload) => {
      return payload.message;
    },
    filter: (payload: CreateChatMessagePayload, _, context) => {
      const isMember = payload.members.find(
        (member) => member.memberId == context.req.user.userId,
      );

      if (isMember) return true;

      return false;
    },
  })
  subscribeChatMessages() {
    return this.pubSub.asyncIterator([NewChatMessageEvent]);
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
