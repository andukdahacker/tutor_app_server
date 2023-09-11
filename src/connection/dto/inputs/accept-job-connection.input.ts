import { JobConnectionType } from '@prisma/client';

export class AcceptJobConnectionInput {
  jobId: string;

  tutorUserId: string;

  tutorId: string;

  learnerUserId: string;

  type: JobConnectionType;
}
