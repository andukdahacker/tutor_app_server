import { Inject } from '@nestjs/common';
import { Resolver, Subscription } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { PUB_SUB } from 'src/pub-sub/pub-sub.module';
import { Notification } from './dto/entities';
import { NotificationService } from './notification.service';

@Resolver()
export class NotificationResolver {
  constructor(
    private readonly notificationService: NotificationService,
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
  ) {}

  @Subscription(() => Notification)
  notifications() {
    return this.pubSub.asyncIterator(['LEARNER_REQUEST']);
  }
}
