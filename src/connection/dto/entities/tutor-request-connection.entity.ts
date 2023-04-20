import { Field, ObjectType } from '@nestjs/graphql';
import { ConnectionStatus, TutorRequestConnectionType } from '@prisma/client';
import { GqlConnectionStatus } from './connection-status.enum';
import { GqlTutorRequestConnectionType } from './tutor-request-connection-type.enum';

@ObjectType()
export class TutorRequestConnection {
  @Field()
  tutorRequestId: string;

  @Field()
  tutorId: string;

  @Field(() => GqlConnectionStatus)
  status: ConnectionStatus;

  @Field(() => GqlTutorRequestConnectionType)
  type: TutorRequestConnectionType;
}
