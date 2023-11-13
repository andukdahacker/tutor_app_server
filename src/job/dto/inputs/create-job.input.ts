import { JobMethod, JobType } from '@prisma/client';

export class CreateJobInput {
  subjectId: string;

  description?: string;

  fee: bigint;

  title: string;

  numberOfSessions?: number;

  jobType: JobType;

  jobMethod: JobMethod;
}
