import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { NestDataLoader } from 'src/dataloader/dataloader';

import { LearnerProfile } from '@prisma/client';
import { JobService } from '../job.service';

@Injectable()
export class LearnerByJobLoader
  implements NestDataLoader<string, LearnerProfile>
{
  constructor(private readonly jobService: JobService) {}
  generateDataLoader(): DataLoader<string, LearnerProfile, string> {
    return new DataLoader<string, LearnerProfile>(
      async (keys: string[]) => await this.jobService.findLearnerByJobIds(keys),
    );
  }
}
