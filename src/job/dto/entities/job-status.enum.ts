import { registerEnumType } from '@nestjs/graphql';

export enum JobStatus {
  OPEN = 'OPEN',
  EMPLOYED = 'EMPLOYED',
  DONE = 'DONE',
}

registerEnumType(JobStatus, { name: 'JobStatus' });
