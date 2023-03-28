import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import * as RedisStore from 'connect-redis';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { Redis } from 'ioredis';
import * as passport from 'passport';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const redisClient = new Redis({
    host: process.env.REDIS_HOST || 'redis',
    port: (process.env.REDIS_PORT as any) || 6379,
  });

  app.use(
    session({
      store: new (RedisStore(session))({ client: redisClient }),
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
      },
    }),
  );

  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(4000);
}
bootstrap();
