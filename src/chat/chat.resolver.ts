import { Body, Controller, Get, Post } from '@nestjs/common';
import { ITokenPayload } from 'src/auth/types';
import { TokenPayload } from 'src/shared/decorators/current-user.decorator';
import { paginate } from 'src/shared/utils/pagination.utils';
import { ChatService } from './chat.service';
import { CreateChatInput, GetChatsInput } from './dto/inputs';

@Controller('chat')
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async createChat(
    @Body() input: CreateChatInput,
    @TokenPayload() { userId }: ITokenPayload,
  ) {
    return await this.chatService.createChat(input, userId);
  }

  @Get()
  async chats(
    @Body() input: GetChatsInput,
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
}
