import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { NestDataLoader } from 'src/dataloader/dataloader';
import { User } from 'src/user/dto/entities';
import { NotificationService } from '../notification.service';

@Injectable()
export class UserByNotificationLoader implements NestDataLoader<string, User> {
  constructor(private readonly notificationService: NotificationService) {}

  generateDataLoader(): DataLoader<string, User, string> {
    return new DataLoader<string, User>(
      async (keys: string[]) =>
        await this.notificationService.getUserByNotificationIds(keys),
    );
  }
}
