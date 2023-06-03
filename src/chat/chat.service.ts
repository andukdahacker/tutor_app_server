import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateChatInput,
  CreateMessageInput,
  DeleteChatMessageInput,
  EditChatMessageInput,
  GetChatMessagesInput,
  GetChatsInput,
} from './dto/inputs';

@Injectable()
export class ChatService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileUploadService,
  ) {}

  async createChat(input: CreateChatInput, userId: string) {
    return await this.prisma.chat.create({
      data: {
        chatMembers: {
          createMany: {
            data: [
              {
                memberId: userId,
              },
              {
                memberId: input.receiverId,
              },
            ],
          },
        },
        messages: input.message
          ? {
              create: {
                author: {
                  connect: {
                    id: userId,
                  },
                },
                content: input.message,
              },
            }
          : undefined,
        relationships: {
          create: {
            requester: {
              connect: {
                id: userId,
              },
            },
            addressee: {
              connect: {
                id: input.receiverId,
              },
            },
          },
        },
      },
    });
  }

  async findChatMembersByChatIds(ids: string[]) {
    const chats = await this.prisma.chat.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        chatMembers: true,
      },
    });

    const mappedResult = ids.map(
      (id) => chats.find((chat) => chat.id == id).chatMembers,
    );

    return mappedResult;
  }

  async createMessage(input: CreateMessageInput, userId: string) {
    const chat = this.prisma.chat.update({
      where: {
        id: input.chatId,
      },
      data: {
        updatedAt: new Date().toISOString(),
      },
      include: {
        chatMembers: {
          select: {
            memberId: true,
          },
        },
      },
    });
    const message = this.prisma.chatMessage.create({
      data: {
        content: input.content,
        chat: {
          connect: {
            id: input.chatId,
          },
        },
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });

    const result = await this.prisma.$transaction([message, chat]);

    return {
      message: result[0],
      members: result[1].chatMembers,
    };
  }

  async getChats(input: GetChatsInput, userId: string) {
    const chats = await this.prisma.chat.findMany({
      where: {
        chatMembers: {
          some: {
            memberId: userId,
          },
        },
      },
      take: input.take,
      cursor: {
        id: input.stringCursor ?? undefined,
      },
      orderBy: { updatedAt: 'desc' },
    });

    return chats;
  }

  async getChatMessagesByChatIds(ids: string[]) {
    const chats = await this.prisma.chat.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        messages: {
          take: 20,
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    const mappedResult = ids.map(
      (id) => chats.find((chat) => chat.id == id).messages,
    );

    return mappedResult;
  }

  async getUserByChatIds(ids: string[]) {
    const chatMessages = await this.prisma.chatMessage.findMany({
      where: {
        chatId: {
          in: ids,
        },
      },
      include: {
        author: true,
      },
    });

    const mappedResult = ids.map(
      (id) =>
        chatMessages.find((chatMessage) => chatMessage.chatId == id).author,
    );

    return mappedResult;
  }

  async getChatMessages(input: GetChatMessagesInput) {
    return await this.prisma.chatMessage.findMany({
      where: {
        chatId: input.chatId,
      },
      take: input.take,
      cursor: {
        id: input.stringCursor ?? undefined,
      },
    });
  }

  async editChatMessage(input: EditChatMessageInput, userId: string) {
    if (!this.isChatMessageAuthor(userId, input.chatMessageId))
      throw new UnauthorizedException();
    return await this.prisma.chatMessage.update({
      where: {
        id: input.chatMessageId,
      },
      data: {
        content: input.chatMessage,
      },
    });
  }

  async deleteChatMessage(input: DeleteChatMessageInput, userId: string) {
    if (!this.isChatMessageAuthor(userId, input.chatMessageId))
      throw new UnauthorizedException();
    return await this.prisma.chatMessage.delete({
      where: {
        id: input.chatMessageId,
      },
    });
  }

  async isChatMessageAuthor(userId: string, chatMessageId: string) {
    const chatMessage = await this.prisma.chatMessage.findUnique({
      where: {
        id: chatMessageId,
      },
    });

    if (chatMessage.authorId == userId) return true;
    return false;
  }

  // async createChatMessageWithFile(
  //   files: Array<Express.Multer.File>,
  //   chatId: string,
  //   userId: string,
  // ) {
  //   const uploadFiles = await Promise.all(
  //     files.map(async (file) => {
  //       const result = await this.fileService.upload(file);
  //       if (!result) {
  //         const retryResult = await this.fileService.retryUpload(file, 5);
  //         return retryResult;
  //       }
  //       return file;
  //     }),
  //   );

  //   const uploadedFiles = uploadFiles.filter((e) => typeof e === 'string');
  // }
}
