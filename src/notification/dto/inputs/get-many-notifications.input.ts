import { InputType, OmitType } from '@nestjs/graphql';
import { PaginatedArgs } from 'src/shared/types/paginated-args.type';

@InputType()
export class GetManyNotificationsInput extends OmitType(PaginatedArgs, [
  'intCursor',
] as const) {}
