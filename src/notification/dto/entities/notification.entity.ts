import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { NotificationType } from '@prisma/client';
import { User } from 'src/user/dto/entities';

@ObjectType()
export class Notification {
  @Field()
  id: string;

  @Field(() => NotificationType)
  notificationType: NotificationType;

  @Field(() => User, { nullable: true })
  notifier?: User;

  @HideField()
  notifierId?: string;

  @Field(() => User)
  receiver?: User;

  @HideField()
  receiverId: string;

  @Field({ nullable: true })
  itemId?: string;

  @Field(() => Boolean)
  isRead: boolean;

  @Field()
  createdAt: Date;
}
