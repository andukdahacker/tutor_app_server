import { Module } from '@nestjs/common';
import { NotificationModule } from 'src/notification/notification.module';
import { NotificationService } from 'src/notification/notification.service';
import { JobConnectionController } from './connection.controller';
import { ConnectionService } from './connection.service';

@Module({
  providers: [JobConnectionController, ConnectionService, NotificationService],
  imports: [NotificationModule],
})
export class ConnectionModule {}
