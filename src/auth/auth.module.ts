import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  providers: [AuthResolver, AuthService, LocalStrategy],
  imports: [UserModule, PassportModule],
})
export class AuthModule {}
