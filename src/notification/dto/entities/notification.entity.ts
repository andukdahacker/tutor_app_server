import { NotificationType, User } from '@prisma/client';

export class Notification {
  id: string;

  notificationType: NotificationType;

  notifier?: User;

  notifierId?: string;

  receiverId: string;

  itemId?: string;

  isRead: boolean;

  createdAt: Date;
}
