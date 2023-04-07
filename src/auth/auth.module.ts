import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PassportModule } from '@nestjs/passport';
import { SendGridModule } from 'src/sendgrid/sendgrid.module';
import { UserModule } from 'src/user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthResolver, AuthService],
  imports: [
    UserModule,
    PassportModule,
    SendGridModule,
    JwtModule.register({
      signOptions: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME || '15s',
      },
      secret: process.env.ACCESS_TOKEN_SECRET || 'secret',
    }),
  ],
})
export class AuthModule {}
