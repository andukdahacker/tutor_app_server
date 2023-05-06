import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis, { RedisOptions } from 'ioredis';
import { Environment } from 'src/config/env.validation';

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

        const environment = configService.get('NODE_ENV') as Environment;
        return new RedisPubSub({
          subscriber:
            environment === Environment.Production
              ? new Redis(process.env.REDIS_URL as string)
              : new Redis(redisOption),
          publisher:
            environment === Environment.Production
              ? new Redis(process.env.REDIS_URL as string)
              : new Redis(redisOption),
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [PUB_SUB],
})
export class PubSubModule {}
