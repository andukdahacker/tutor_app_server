import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { NestDataLoader } from 'src/dataloader/dataloader';

import { TutorProfileSubject } from '@prisma/client';
import { TutorProfileService } from '../tutor-profile.service';

@Injectable()
export class TutorProfileSubjectsByTutorLoader
  implements NestDataLoader<string, TutorProfileSubject[]>
{
  constructor(private readonly tutorProfileService: TutorProfileService) {}
  generateDataLoader(): DataLoader<string, TutorProfileSubject[], string> {
    return new DataLoader<string, TutorProfileSubject[]>(
      async (keys: string[]) =>
        await this.tutorProfileService.findSubjectsByTutorIds(keys),
    );
  }
}
