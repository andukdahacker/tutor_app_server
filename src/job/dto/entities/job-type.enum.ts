import { registerEnumType } from '@nestjs/graphql';

export enum JobType {
  QA = 'QA',
  TUTOR = 'TUTOR',
}

registerEnumType(JobType, { name: 'JobType' });
