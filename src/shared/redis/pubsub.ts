import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis, { RedisOptions } from 'ioredis';

export const PUB_SUB = 'PUB_SUB';

export const redisOption: RedisOptions = {
  host: process.env.REDIS_HOST,
  port: +process.env.REDIS_PORT,
};

export const redis = new RedisPubSub({
  subscriber: new Redis(redisOption),
  publisher: new Redis(redisOption),
});
