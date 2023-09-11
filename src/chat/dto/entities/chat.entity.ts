import { ChatMember } from './chat-member.entity';
import { ChatMessage } from './chat-message.entity';

export class Chat {
  id: string;

  chatMembers: ChatMember[];

  chatMessages: ChatMessage[];

  updatedAt: Date;
}
