import { Body, Controller, Get, Req } from '@nestjs/common';

import { ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';
import { ErrorResponse } from 'src/shared/types/error_response';
import {
  ApiOkPaginatedResponse,
  Paginated,
} from 'src/shared/types/pagination.type';
import { paginate } from 'src/shared/utils/pagination.utils';
import { NotificationEntity } from './dto/entities';
import { GetManyNotificationsInput } from './dto/inputs/get-many-notifications.input';
import { NotificationService } from './notification.service';

@ApiTags('Notification')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @ApiOkPaginatedResponse(NotificationEntity)
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  async getManyNotifications(
    @Req() req,
    @Body() input: GetManyNotificationsInput,
  ): Promise<Paginated<NotificationEntity>> {
    const notifications = await this.notificationService.getNotifications(
      req.user.userId,
      input,
    );

    return paginate(
      notifications,
      'id',
      async (cursor: string) =>
        await this.notificationService.getNotifications(req.user.userId, {
          stringCursor: cursor,
          ...input,
        }),
    );
  }
}
