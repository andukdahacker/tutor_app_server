import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { Environment } from 'src/config/env.validation';

export const REDIS = 'IORedis';

@Module({
  imports: [ConfigModule],
  exports: [REDIS],
  providers: [
    {
      provide: REDIS,
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const enviroment = configService.get('NODE_ENV') as Environment;
        if (enviroment === Environment.Production) {
          return new Redis(process.env.REDIS_URL as string);
        }
        return new Redis({
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        });
      },
    },
  ],
})
export class RedisModule {}
