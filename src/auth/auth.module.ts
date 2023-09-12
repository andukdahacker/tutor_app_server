import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from 'src/mailer/mailer.module';
import { MailerService } from 'src/mailer/mailer.service';
import { RedisModule } from 'src/redis/redis.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService, MailerService],
  controllers: [AuthController],
  imports: [
    UserModule,
    JwtModule.register({
      signOptions: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME || '15s',
      },
      secret: process.env.ACCESS_TOKEN_SECRET || 'secret',
    }),
    RedisModule,
    MailerModule,
  ],
})
export class AuthModule {}
