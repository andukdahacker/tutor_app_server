import { Field, InputType, Int, OmitType } from '@nestjs/graphql';
import { JobType } from '@prisma/client';
import { SortBy } from 'src/shared/enums/sort-by.enum';

import { PaginatedArgs } from 'src/shared/types/paginated-args.type';
import { JobMethod } from '../entities/job-method.enum';

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

  @Field(() => JobMethod, { nullable: true })
  jobMethod?: JobMethod;

  @Field(() => SortBy)
  sortBy: SortBy;
}
