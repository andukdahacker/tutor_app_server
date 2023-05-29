import { ChatMessage } from '@prisma/client';

export type CreateChatMessagePayload = {
  message: ChatMessage;
  members: {
    memberId: string;
  }[];
};
