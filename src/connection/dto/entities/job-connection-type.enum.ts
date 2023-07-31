import { registerEnumType } from '@nestjs/graphql';

export enum JobConnectionType {
  TUTOR_TO_JOB = 'TUTOR_TO_JOB',
  JOB_TO_TUTOR = 'JOB_TO_TUTOR',
}

registerEnumType(JobConnectionType, {
  name: 'JobConnectionType',
});
