import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ITokenPayload } from 'src/auth/types';
import { TokenPayload } from 'src/shared/decorators/current-user.decorator';
import { paginate } from 'src/shared/utils/pagination.utils';
import { ChatService } from './chat.service';
import {
  CreateMessageInput,
  DeleteChatMessageInput,
  EditChatMessageInput,
  GetChatMessagesInput,
} from './dto/inputs';

@Controller('message')
export class ChatMessageController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async createMessage(
    @Body() input: CreateMessageInput,
    @TokenPayload() { userId }: ITokenPayload,
  ) {
    const result = await this.chatService.createMessage(input, userId);
    // this.pubSub.publish(NewChatMessageEvent, result);
    return result.message;
  }

  @Put()
  async editChatMessage(
    @Body() input: EditChatMessageInput,
    @TokenPayload() { userId }: ITokenPayload,
  ) {
    return await this.chatService.editChatMessage(input, userId);
  }

  @Delete()
  async deleteChatMessage(
    @Body() input: DeleteChatMessageInput,
    @TokenPayload() { userId }: ITokenPayload,
  ) {
    return await this.chatService.deleteChatMessage(input, userId);
  }

  @Get()
  async messages(@Body() input: GetChatMessagesInput) {
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
}
