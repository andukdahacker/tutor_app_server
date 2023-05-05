import { Module } from '@nestjs/common';
import { DateScalar } from 'src/shared/scalars/date.scalar';
import { NotificationResolver } from './notification.resolver';
import { NotificationService } from './notification.service';

@Module({
  providers: [NotificationResolver, NotificationService, DateScalar],
})
export class NotificationModule {}
