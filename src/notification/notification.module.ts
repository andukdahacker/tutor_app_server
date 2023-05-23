import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'src/dataloader/dataloader';
import { DateScalar } from 'src/shared/scalars/date.scalar';
import { NotificationResolver } from './notification.resolver';
import { NotificationService } from './notification.service';

@Module({
  providers: [
    NotificationResolver,
    NotificationService,
    DateScalar,
    { provide: APP_INTERCEPTOR, useClass: DataLoaderInterceptor },
  ],
})
export class NotificationModule {}
