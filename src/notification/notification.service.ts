import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationInput } from './types/create-notification-input.type';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async createNotification({
    type,
    notifierId,
    receiverId,
    itemId,
  }: CreateNotificationInput) {
    const notification = await this.prisma.notification.create({
      data: {
        notificationType: type,
        notifier: {
          connect: {
            id: notifierId,
          },
        },
        receiver: {
          connect: {
            id: receiverId,
          },
        },
        itemId,
      },
    });

    return notification;
  }
}
