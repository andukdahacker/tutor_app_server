import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { NestDataLoader } from 'src/dataloader/dataloader';
import { Subject } from 'src/subject/dto/entities';
import { TutorProfileSubjectService } from '../tutor-profile-subject.service';

@Injectable()
export class SubjectByTutorProfileSubjectLoader
  implements NestDataLoader<string, Subject>
{
  constructor(
    private readonly tutorProfileSubjectService: TutorProfileSubjectService,
  ) {}

  generateDataLoader(): DataLoader<string, Subject, string> {
    return new DataLoader<string, Subject>(
      async (keys: string[]) =>
        await this.tutorProfileSubjectService.findSubjectByTutorIds(keys),
    );
  }
}
