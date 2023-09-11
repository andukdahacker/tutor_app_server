import { JobConnectionType } from '@prisma/client';

export class DeclineJobConnectionInput {
  jobId: string;

  tutorUserId: string;

  tutorId: string;

  learnerUserId: string;

  type: JobConnectionType;
}
