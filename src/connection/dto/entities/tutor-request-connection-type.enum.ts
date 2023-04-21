import { registerEnumType } from '@nestjs/graphql';
import { TutorRequestConnectionType } from '@prisma/client';

registerEnumType(TutorRequestConnectionType, {
  name: 'TutorRequestConnectType',
});
