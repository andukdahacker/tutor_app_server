import { ConnectionStatus, JobConnectionType } from '@prisma/client';

export class JobConnectionWhereInput {
  tutorId?: string;

  jobId?: string;

  type?: JobConnectionType;

  status?: ConnectionStatus;

  take: number;

  stringCursor?: string;
}
