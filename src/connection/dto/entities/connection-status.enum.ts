import { registerEnumType } from '@nestjs/graphql';

export enum ConnectionStatus {
  REQUESTED = 'REQUESTED',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
}

registerEnumType(ConnectionStatus, {
  name: 'ConnectionStatus',
});
