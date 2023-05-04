import { registerEnumType } from '@nestjs/graphql';
import { JobConnectionType } from '@prisma/client';

registerEnumType(JobConnectionType, {
  name: 'JobConnectType',
});
