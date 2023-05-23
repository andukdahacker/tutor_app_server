import { Injectable } from '@nestjs/common';
import { JobConnection } from '@prisma/client';
import DataLoader from 'dataloader';
import { NestDataLoader } from 'src/dataloader/dataloader';
import { TutorProfileService } from '../tutor-profile.service';

@Injectable()
export class JobConnectionsByTutorLoader
  implements NestDataLoader<string, JobConnection[]>
{
  constructor(private readonly tutorProfileService: TutorProfileService) {}
  generateDataLoader(): DataLoader<string, JobConnection[]> {
    return new DataLoader<string, JobConnection[]>(
      async (keys: string[]) =>
        await this.tutorProfileService.findJobConnectionsByTutorIds(keys),
    );
  }
}
