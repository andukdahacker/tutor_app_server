import { registerEnumType } from '@nestjs/graphql';
import { ConnectionStatus } from '@prisma/client';

registerEnumType(ConnectionStatus, {
  name: 'ConnectionStatus',
});
