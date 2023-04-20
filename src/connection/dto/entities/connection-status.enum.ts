import { registerEnumType } from '@nestjs/graphql';

export enum GqlConnectionStatus {
  REQUESTED,
  ACCEPTED,
  DECLINED,
}
registerEnumType(GqlConnectionStatus, {
  name: 'ConnectionStatus',
});
