import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { NestDataLoader } from 'src/dataloader/dataloader';
import { User } from 'src/user/dto/entities';
import { TutorProfileService } from '../tutor-profile.service';

@Injectable()
export class UserByTutorLoader implements NestDataLoader<string, User> {
  constructor(private readonly tutorProfileService: TutorProfileService) {}

  generateDataLoader(): DataLoader<string, User, string> {
    return new DataLoader<string, User>(
      async (keys: string[]) =>
        await this.tutorProfileService.findUsersByTutorIds(keys),
    );
  }
}
