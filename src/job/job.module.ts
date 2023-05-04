import { Module } from '@nestjs/common';
import { ConnectionModule } from 'src/connection/connection.module';
import { ConnectionService } from 'src/connection/connection.service';
import { JobResolver } from './job.resolver';
import { JobService } from './job.service';

@Module({
  providers: [JobResolver, JobService, ConnectionService],
  imports: [ConnectionModule],
})
export class JobModule {}
