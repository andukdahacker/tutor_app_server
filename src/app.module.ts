import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { ChatModule } from './chat/chat.module';
import { ConnectionModule } from './connection/connection.module';
import { DataloaderModule } from './dataloader/dataloader.module';
import { DataloaderService } from './dataloader/dataloader.service';
import { LearnerProfileModule } from './learner-profile/learner-profile.module';
import { NotificationModule } from './notification/notification.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { SubjectModule } from './subject/subject.module';
import { TutorProfileModule } from './tutor-profile/tutor-profile.module';
import { TutorRequestModule } from './tutor-request/tutor-request.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [DataloaderModule],
      inject: [DataloaderService],
      useFactory: (dataloaderService: DataloaderService) => {
        return {
          playground: false,
          context: () => ({ loaders: dataloaderService.createLoader() }),
          autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
          plugins: [
            ApolloServerPluginLandingPageLocalDefault({ includeCookies: true }),
          ],
          subscriptions: {
            'graphql-ws': {
              path: '/graphql',
            },
          },
        };
      },
    }),
    PrismaModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    LearnerProfileModule,
    ConnectionModule,
    NotificationModule,
    ChatModule,
    TutorRequestModule,
    SubjectModule,
    TutorProfileModule,
    DataloaderModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    // { provide: APP_GUARD, useClass: JwtAuthGuard },
    AuthService,
    JwtService,
  ],
})
export class AppModule {}
