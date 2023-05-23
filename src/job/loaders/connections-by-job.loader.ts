import { Injectable } from '@nestjs/common';
import { JobConnection } from '@prisma/client';
import DataLoader from 'dataloader';
import { NestDataLoader } from 'src/dataloader/dataloader';
import { JobService } from '../job.service';

@Injectable()
export class ConnectionsByJobLoader
  implements NestDataLoader<string, JobConnection[]>
{
  constructor(private readonly jobService: JobService) {}

  generateDataLoader(): DataLoader<string, JobConnection[], string> {
    return new DataLoader<string, JobConnection[]>(
      async (keys: string[]) =>
        await this.jobService.findConnectionsByJobIds(keys),
    );
  }
}
