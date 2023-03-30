import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthResolver, AuthService],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      signOptions: {
        expiresIn: '1d',
      },
      secret: process.env.ACCESS_TOKEN_SECRET || 'secret',
    }),
  ],
})
export class AuthModule {}
