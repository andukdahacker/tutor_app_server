import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  providers: [AuthResolver, AuthService, LocalStrategy, JwtStrategy],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      signOptions: {
        expiresIn: '60s',
      },
      secret: process.env.JWT_SECRET || 'secret',
    }),
  ],
})
export class AuthModule {}
