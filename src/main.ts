import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableCors({
    origin: '*',
    methods: '*',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  app.use(cookieParser());

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Tutor app')
    .setDescription('Tutor app API documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 4000, '0.0.0.0');
}
bootstrap();
