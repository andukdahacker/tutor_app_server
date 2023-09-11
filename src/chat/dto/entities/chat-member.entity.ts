export class ChatMember {
  memberId: string;

  chatId: string;

  isRead: boolean;

  isViewed: boolean;

  joinedAt: Date;

  leftAt?: Date;
}
