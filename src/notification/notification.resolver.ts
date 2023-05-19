import { Inject } from '@nestjs/common';
import {
  Args,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { ITokenPayload } from 'src/auth/types';
import { IDataloader } from 'src/dataloader/types/IDataloader';
import { PUB_SUB } from 'src/pub-sub/pub-sub.module';
import { TokenPayload } from 'src/shared/decorators/current-user.decorator';
import { Loaders } from 'src/shared/decorators/dataloader.decorator';
import { Notification } from './dto/entities';
import { GetManyNotificationsInput } from './dto/inputs/get-many-notifications.input';
import { GetManyNotificationsResponse } from './dto/response';
import { NotificationCreatedEvent } from './notification.constants';
import { NotificationService } from './notification.service';
@Resolver(() => Notification)
export class NotificationResolver {
  constructor(
    private readonly notificationService: NotificationService,
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
  ) {}

  @Query(() => GetManyNotificationsResponse)
  async getManyNotifications(
    @TokenPayload() { userId }: ITokenPayload,
    @Args('getManyNotificationsInput') input: GetManyNotificationsInput,
  ): Promise<GetManyNotificationsResponse> {
    const notifications = await this.notificationService.getNotifications(
      userId,
      input,
    );

    if (notifications.length > 0) {
      const lastNotifications = notifications[notifications.length - 1];
      const cursor = lastNotifications.id;

      const nextQuery = await this.notificationService.getNotifications(
        userId,
        {
          stringCursor: cursor,
          ...input,
        },
      );

      if (nextQuery.length > 0) {
        return {
          nodes: notifications,
          pageInfo: {
            hasNextPage: true,
            lastTake: nextQuery.length,
            totalAmount: notifications.length,
            cursor: {
              value: cursor,
            },
          },
        };
      }
    }
    return {
      nodes: notifications,
      pageInfo: {
        hasNextPage: false,
        lastTake: 0,
        totalAmount: notifications.length,
      },
    };
  }

  @Subscription(() => Notification, {
    resolve: (payload: Notification) => {
      console.log('payload', payload);
      return payload;
    },
    filter: (payload: Notification, variables) => {
      return variables.userId === payload.receiverId;
    },
  })
  subscribeNotifications(@Args('userId') _: string) {
    return this.pubSub.asyncIterator([NotificationCreatedEvent]);
  }

  @ResolveField()
  async notifier(
    @Parent() notification: Notification,
    @Loaders() loader: IDataloader,
  ) {
    const user = loader.usersLoader.load(notification.notifierId);

    return user;
  }

  @ResolveField()
  async receiver(
    @Parent() notification: Notification,
    @Loaders() loader: IDataloader,
  ) {
    const user = loader.usersLoader.load(notification.receiverId);
    return user;
  }
}
