import { registerEnumType } from '@nestjs/graphql';

export enum UserEventType {
  FREE = 'FREE',
  JOB = 'JOB',
}

registerEnumType(UserEventType, { name: 'UserEventType' });
