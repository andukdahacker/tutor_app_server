import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Notification, NotificationType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { ToTimestamp } from 'src/shared/utils/transform.utils';
import { UserEntity } from 'src/user/dto/entity/user.entity';

export class NotificationEntity implements Notification {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: NotificationType, enumName: 'NotificationType' })
  notificationType: NotificationType;

  @ApiPropertyOptional({ type: () => UserEntity })
  notifier?: UserEntity;

  @ApiProperty()
  notifierId: string;

  @ApiProperty()
  receiverId: string;

  @ApiProperty()
  itemId: string;

  @ApiProperty()
  isRead: boolean;

  @ApiProperty({ type: Number })
  @Transform(ToTimestamp)
  createdAt: Date;

  constructor({ notifier, ...data }: NotificationEntity) {
    Object.assign(this, data);

    this.notifier = notifier ? new UserEntity(notifier) : null;
  }
}
