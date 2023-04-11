import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { ChatModule } from './chat/chat.module';
import { ConnectionModule } from './connection/connection.module';
import { NotificationModule } from './notification/notification.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { ProfileModule } from './profile/profile.module';
import { JwtAuthGuard } from './shared/guards/jwt-auth.guard';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      plugins: [
        ApolloServerPluginLandingPageLocalDefault({ includeCookies: true }),
      ],
      formatError: (error) => {
        return error;
      },
    }),
    PrismaModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProfileModule,
    ConnectionModule,
    NotificationModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    AuthService,
    JwtService,
  ],
})
export class AppModule {}
