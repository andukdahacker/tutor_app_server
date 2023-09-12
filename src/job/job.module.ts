import { Module } from '@nestjs/common';
import { ConnectionModule } from 'src/connection/connection.module';
import { ConnectionService } from 'src/connection/connection.service';
import { JobController } from './job.controller';
import { JobService } from './job.service';

@Module({
  providers: [JobService, ConnectionService],
  controllers: [JobController],
  imports: [ConnectionModule],
})
export class JobModule {}
