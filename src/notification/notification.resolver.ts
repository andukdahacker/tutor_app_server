import { Inject } from '@nestjs/common';
import { Args, Resolver, Subscription } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { PUB_SUB } from 'src/pub-sub/pub-sub.module';
import { Notification } from './dto/entities';
import { NotificationCreatedEvent } from './notification.constants';
import { NotificationService } from './notification.service';
@Resolver()
export class NotificationResolver {
  constructor(
    private readonly notificationService: NotificationService,
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
  ) {}

  @Subscription(() => Notification, {
    resolve: (payload: Notification) => {
      return payload;
    },
    filter: (payload: Notification, variables) => {
      return variables.userId === payload.receiverId;
    },
  })
  notifications(@Args('userId') _: string) {
    return this.pubSub.asyncIterator([NotificationCreatedEvent]);
  }
}
