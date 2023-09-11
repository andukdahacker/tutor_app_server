import { Body, Controller, Get } from '@nestjs/common';

import { ITokenPayload } from 'src/auth/types';
import { TokenPayload } from 'src/shared/decorators/current-user.decorator';
import { paginate } from 'src/shared/utils/pagination.utils';
import { GetManyNotificationsInput } from './dto/inputs/get-many-notifications.input';
import { GetManyNotificationsResponse } from './dto/response';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  async getManyNotifications(
    @TokenPayload() { userId }: ITokenPayload,
    @Body() input: GetManyNotificationsInput,
  ): Promise<GetManyNotificationsResponse> {
    const notifications = await this.notificationService.getNotifications(
      userId,
      input,
    );

    return paginate(
      notifications,
      'id',
      async (cursor: string) =>
        await this.notificationService.getNotifications(userId, {
          stringCursor: cursor,
          ...input,
        }),
    );
  }
}
