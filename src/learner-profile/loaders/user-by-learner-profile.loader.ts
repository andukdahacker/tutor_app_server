import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { NestDataLoader } from 'src/dataloader/dataloader';
import { User } from 'src/user/dto/entities';
import { LearnerProfileService } from '../learner-profile.service';

@Injectable()
export class UserByLearnerLoader implements NestDataLoader<string, User> {
  constructor(private readonly learnerProfileService: LearnerProfileService) {}

  generateDataLoader(): DataLoader<string, User> {
    return new DataLoader<string, User>(
      async (keys: string[]) =>
        await this.learnerProfileService.getUserByLearnerIds(keys),
    );
  }
}
