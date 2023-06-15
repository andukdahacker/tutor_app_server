import { registerEnumType } from '@nestjs/graphql';

export enum JobMethod {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  BOTH = 'BOTH',
}

registerEnumType(JobMethod, { name: 'JobMethod' });
