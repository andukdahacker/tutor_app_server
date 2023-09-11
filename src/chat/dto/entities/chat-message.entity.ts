import { User } from '@prisma/client';

export class ChatMessage {
  id: string;

  authorId: string;

  author: User;

  chatId: string;

  content: string;

  createdAt: Date;

  updatedAt?: Date;
}
