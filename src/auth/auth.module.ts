import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { SessionSerializer } from './strategies/session-serializer';

@Module({
  providers: [AuthResolver, AuthService, LocalStrategy, SessionSerializer],
  imports: [UserModule, PassportModule.register({ session: true })],
})
export class AuthModule {}
