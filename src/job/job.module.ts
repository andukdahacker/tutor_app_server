import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConnectionModule } from 'src/connection/connection.module';
import { ConnectionService } from 'src/connection/connection.service';
import { DataLoaderInterceptor } from 'src/dataloader/dataloader';
import { JobResolver } from './job.resolver';
import { JobService } from './job.service';

@Module({
  providers: [
    JobResolver,
    JobService,
    ConnectionService,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
  imports: [ConnectionModule],
})
export class JobModule {}
