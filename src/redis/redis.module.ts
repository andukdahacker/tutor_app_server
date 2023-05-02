import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

export const REDIS = 'IORedis';

@Module({
  imports: [ConfigModule],
  exports: [REDIS],
  providers: [
    {
      provide: REDIS,
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return new Redis({
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        });
      },
    },
  ],
})
export class RedisModule {}
