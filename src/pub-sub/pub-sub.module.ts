import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis, { RedisOptions } from 'ioredis';

export const PUB_SUB = 'PUB_SUB';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: PUB_SUB,
      useFactory(configService: ConfigService) {
        const redisOption: RedisOptions = {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        };
        return new RedisPubSub({
          subscriber: new Redis(redisOption),
          publisher: new Redis(redisOption),
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [PUB_SUB],
})
export class PubSubModule {}
