import { Injectable } from '@nestjs/common';
import { Job } from '@prisma/client';
import DataLoader from 'dataloader';
import { NestDataLoader } from 'src/dataloader/dataloader';
import { UserEventService } from '../user-event.service';

@Injectable()
export class JobByUserEventLoader implements NestDataLoader<string, Job> {
  constructor(private readonly userEventService: UserEventService) {}
  generateDataLoader(): DataLoader<string, Job, string> {
    return new DataLoader<string, Job>(
      async (keys: string[]) =>
        await this.userEventService.getJobsByUserEventIds(keys),
    );
  }
}
