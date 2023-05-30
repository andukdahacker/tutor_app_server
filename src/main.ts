import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { ConfigService } from '@nestjs/config';
import { graphqlUploadExpress } from 'graphql-upload-ts';
import { AppModule } from './app.module';
import { Environment } from './config/env.validation';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const configService = app.get<ConfigService>(ConfigService);

  app.enableCors({
    credentials: true,
    origin:
      configService.get('NODE_ENV') === Environment.Production
        ? ['https://tutor-app-client.vercel.app']
        : ['http://localhost:3000'],
  });
  app.use(cookieParser());

  app.use(graphqlUploadExpress());
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(process.env.PORT || 4000, '0.0.0.0');
}
bootstrap();
