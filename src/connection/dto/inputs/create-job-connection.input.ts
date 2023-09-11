import { JobConnectionType } from '@prisma/client';

export class CreateJobConnectInput {
  jobId: string;

  tutorUserId: string;

  tutorId: string;

  learnerUserId: string;

  type: JobConnectionType;
}
