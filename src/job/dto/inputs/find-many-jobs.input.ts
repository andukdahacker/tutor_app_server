import { JobMethod, JobType, Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class FindManyJobsInput {
  @IsInt()
  @Transform((param) => Number.parseInt(param.value))
  take: number;
  stringCursor?: string;
  searchString: string;

  @IsOptional()
  @Transform(function (param) {
    return BigInt(param.value);
  })
  fee?: bigint;
  jobType?: JobType;
  jobMethod?: JobMethod;
  sortBy: Prisma.SortOrder;
}
