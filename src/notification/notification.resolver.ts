import { Inject } from '@nestjs/common';
import {
  Args,
  Parent,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { IDataloader } from 'src/dataloader/types/IDataloader';
import { PUB_SUB } from 'src/pub-sub/pub-sub.module';
import { Loaders } from 'src/shared/decorators/dataloader.decorator';
import { Notification } from './dto/entities';
import { NotificationCreatedEvent } from './notification.constants';
import { NotificationService } from './notification.service';
@Resolver(() => Notification)
export class NotificationResolver {
  constructor(
    private readonly notificationService: NotificationService,
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
  ) {}

  @Subscription(() => Notification, {
    resolve: (payload: Notification) => {
      console.log('payload', payload);
      return payload;
    },
    filter: (payload: Notification, variables) => {
      return variables.userId === payload.receiverId;
    },
  })
  notifications(@Args('userId') _: string) {
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
