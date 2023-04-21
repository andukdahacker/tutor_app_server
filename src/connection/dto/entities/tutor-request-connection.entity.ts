import { Field, ObjectType } from '@nestjs/graphql';
import { ConnectionStatus, TutorRequestConnectionType } from '@prisma/client';

@ObjectType()
export class TutorRequestConnection {
  @Field()
  tutorRequestId: string;

  @Field()
  tutorId: string;

  @Field(() => ConnectionStatus)
  status: ConnectionStatus;

  @Field(() => TutorRequestConnectionType)
  type: TutorRequestConnectionType;
}
