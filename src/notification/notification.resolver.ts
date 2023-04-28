import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { PUB_SUB } from 'src/pub-sub/pub-sub.module';
import { NotificationService } from './notification.service';

@Resolver()
export class NotificationResolver {
  constructor(
    private readonly notificationService: NotificationService,
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
  ) {}
}
