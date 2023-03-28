import { Module } from '@nestjs/common';
import Redis from 'ioredis';

export const REDIS = Symbol('AUTH:REDIS');

@Module({
  providers: [
    {
      provide: REDIS,
      useValue: new Redis({
        host: process.env.REDIS_HOST || 'redis',
        port: (process.env.REDIS_PORT as any) || 6379,
      }),
    },
  ],
  exports: [REDIS],
})
export class RedisModule {}
