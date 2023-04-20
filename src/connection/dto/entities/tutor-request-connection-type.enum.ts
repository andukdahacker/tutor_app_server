import { registerEnumType } from '@nestjs/graphql';

export enum GqlTutorRequestConnectionType {
  TUTOR_TO_TUTOR_REQUEST,
  TUTOR_REQUEST_TO_TUTOR,
}
registerEnumType(GqlTutorRequestConnectionType, {
  name: 'TutorRequestConnectType',
});
