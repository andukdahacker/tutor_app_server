import { Field, InputType, Int, OmitType } from '@nestjs/graphql';
import { JobMethod, JobType, Prisma } from '@prisma/client';

import { PaginatedArgs } from 'src/shared/types/paginated-args.type';

@InputType()
export class FindManyJobsInput extends OmitType(PaginatedArgs, [
  'intCursor',
] as const) {
  @Field()
  searchString: string;

  @Field(() => Int, { nullable: true })
  fee?: number;

  @Field({ nullable: true })
  jobType?: JobType;

  @Field({ nullable: true })
  jobMethod?: JobMethod;

  @Field()
  sortOrder: Prisma.SortOrder;
}
