import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChatInput, CreateMessageInput } from './dto/inputs';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

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
    return await this.prisma.chatMessage.create({
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
  }
}
