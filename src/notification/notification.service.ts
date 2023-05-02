import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
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
    let args: Prisma.NotificationCreateArgs;

    switch (type) {
      case 'LEARNER_REQUEST': {
        args = {
          data: {
            notificationType: 'LEARNER_REQUEST',
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
        };
        break;
      }
    }
    const notification = await this.prisma.notification.create(args);

    return notification;
  }
}
