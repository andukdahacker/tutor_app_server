import { ConnectionStatus, JobConnectionType } from '@prisma/client';

export class JobConnection {
  jobId: string;

  tutorId: string;

  status: ConnectionStatus;

  type: JobConnectionType;
}
