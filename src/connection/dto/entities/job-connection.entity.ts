import { Field, ObjectType } from '@nestjs/graphql';
import { ConnectionStatus, JobConnectionType } from '@prisma/client';

@ObjectType()
export class JobConnection {
  @Field()
  jobId: string;

  @Field()
  tutorId: string;

  @Field(() => ConnectionStatus)
  status: ConnectionStatus;

  @Field(() => JobConnectionType)
  type: JobConnectionType;
}
