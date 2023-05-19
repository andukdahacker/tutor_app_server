import { Field, InputType, OmitType } from '@nestjs/graphql';
import { PaginatedArgs } from 'src/shared/types/paginated-args.type';

@InputType()
export class GetRequestedJobForTutorInput extends OmitType(PaginatedArgs, [
  'intCursor',
] as const) {
  @Field()
  tutorId: string;
}
