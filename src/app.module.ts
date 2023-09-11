import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { ChatModule } from './chat/chat.module';
import { validate } from './config/env.validation';
import { ConnectionModule } from './connection/connection.module';
import { EducationModule } from './education/education.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { JobModule } from './job/job.module';
import { LearnerProfileModule } from './learner-profile/learner-profile.module';
import { MailerModule } from './mailer/mailer.module';
import { NotificationModule } from './notification/notification.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { RatingModule } from './rating/rating.module';
import { RedisModule } from './redis/redis.module';
import { ScheduleModule } from './schedule/schedule.module';
import { JwtAuthGuard } from './shared/guards/jwt-auth.guard';
import { SubjectModule } from './subject/subject.module';
import { TutorProfileModule } from './tutor-profile/tutor-profile.module';
import { UserModule } from './user/user.module';
import { WorkExperienceModule } from './work-experience/work-experience.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, validate }),
    LearnerProfileModule,
    ConnectionModule,
    NotificationModule,
    ChatModule,
    JobModule,
    SubjectModule,
    TutorProfileModule,
    RedisModule,
    WorkExperienceModule,
    EducationModule,
    RatingModule,
    FileUploadModule,
    MailerModule,
    ScheduleModule,
    // FirebaseModule,
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
