import { registerEnumType } from '@nestjs/graphql';
import { UserEventStatus } from '@prisma/client';

registerEnumType(UserEventStatus, {
  name: 'UserEventStatus',
});
