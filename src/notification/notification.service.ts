import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetManyNotificationsInput } from './dto/inputs/get-many-notifications.input';
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

  async getNotifications(userId: string, input: GetManyNotificationsInput) {
    return await this.prisma.notification.findMany({
      where: {
        receiver: {
          id: userId,
        },
      },
      take: input.take ?? undefined,
      cursor: {
        id: input.stringCursor ?? undefined,
      },
      skip: input.stringCursor ? 1 : undefined,
    });
  }

  async getUserByNotificationIds(ids: string[]) {
    const notifications = await this.prisma.notification.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        notifier: true,
      },
    });

    const mappedResult = ids.map(
      (id) =>
        notifications.find((notification) => notification.id == id).notifier,
    );

    return mappedResult;
  }
}
