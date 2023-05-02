import { Module } from '@nestjs/common';
import { NotificationModule } from 'src/notification/notification.module';
import { NotificationService } from 'src/notification/notification.service';
import { ConnectionResolver } from './connection.resolver';
import { ConnectionService } from './connection.service';

@Module({
  providers: [ConnectionResolver, ConnectionService, NotificationService],
  imports: [NotificationModule],
})
export class ConnectionModule {}
