import { JobMethod, JobType, Prisma } from '@prisma/client';

export class FindManyJobsInput {
  take: number;
  stringCursor?: string;
  searchString: string;
  fee?: number;
  jobType?: JobType;
  jobMethod?: JobMethod;
  sortBy: Prisma.SortOrder;
}
