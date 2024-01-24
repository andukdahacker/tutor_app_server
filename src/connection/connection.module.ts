import { Module } from '@nestjs/common';
import { JobService } from 'src/job/job.service';
import { NotificationModule } from 'src/notification/notification.module';
import { NotificationService } from 'src/notification/notification.service';
import { JobConnectionController } from './connection.controller';
import { ConnectionService } from './connection.service';

@Module({
  providers: [ConnectionService, NotificationService, JobService],
  controllers: [JobConnectionController],
  imports: [NotificationModule],
})
export class ConnectionModule {}
