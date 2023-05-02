import { NotificationType } from '@prisma/client';

export interface CreateNotificationInput {
  type: NotificationType;
  receiverId: string;
  itemId: string;
  notifierId?: string;
}
