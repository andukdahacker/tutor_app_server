import { Module } from '@nestjs/common';
import { ConnectionModule } from 'src/connection/connection.module';
import { ConnectionService } from 'src/connection/connection.service';
import { JobResolver } from './job.resolver';
import { JobService } from './job.service';
import {
  ConnectionsByJobLoader,
  LearnerByJobLoader,
  SubjectByJobLoader,
} from './loaders';

@Module({
  providers: [
    JobResolver,
    JobService,
    ConnectionService,
    LearnerByJobLoader,
    ConnectionsByJobLoader,
    SubjectByJobLoader,
  ],
  imports: [ConnectionModule],
})
export class JobModule {}
