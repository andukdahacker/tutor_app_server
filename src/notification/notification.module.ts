import { Module } from '@nestjs/common';
import { PubSubModule } from 'src/pub-sub/pub-sub.module';
import { NotificationResolver } from './notification.resolver';
import { NotificationService } from './notification.service';

@Module({
  providers: [NotificationResolver, NotificationService],
  imports: [PubSubModule],
})
export class NotificationModule {}
