import { Field, InputType, OmitType } from '@nestjs/graphql';
import { PaginatedArgs } from 'src/shared/types/paginated-args.type';

@InputType()
export class GetChatMessagesInput extends OmitType(PaginatedArgs, [
  'intCursor',
] as const) {
  @Field()
  chatId: string;
}
