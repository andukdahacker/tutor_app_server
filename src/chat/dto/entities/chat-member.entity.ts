import { Field, HideField, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatMember {
  @HideField()
  memberId: string;

  @HideField()
  chatId: string;

  @Field(() => Boolean)
  isRead: boolean;

  @Field(() => Boolean)
  isViewed: boolean;

  @Field()
  joinedAt: Date;

  @Field({ nullable: true })
  leftAt?: Date;
}
