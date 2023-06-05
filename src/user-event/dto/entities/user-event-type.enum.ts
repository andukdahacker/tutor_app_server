import { registerEnumType } from '@nestjs/graphql';
import { UserEventType } from '@prisma/client';

registerEnumType(UserEventType, {
  name: 'UserEventType',
});
