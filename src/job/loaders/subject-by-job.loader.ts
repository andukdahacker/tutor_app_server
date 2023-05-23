import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { NestDataLoader } from 'src/dataloader/dataloader';
import { Subject } from 'src/subject/dto/entities';
import { JobService } from '../job.service';

@Injectable()
export class SubjectByJobLoader implements NestDataLoader<string, Subject> {
  constructor(private readonly jobService: JobService) {}

  generateDataLoader(): DataLoader<string, Subject, string> {
    return new DataLoader<string, Subject>(
      async (keys: string[]) => await this.jobService.findSubjectByJobIds(keys),
    );
  }
}
