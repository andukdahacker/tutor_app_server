import { Field, ObjectType } from '@nestjs/graphql';
import {
  ConnectionStatus as ConnectionStatusPrisma,
  JobConnectionType as JobConnectionTypePrisma,
} from '@prisma/client';
import { ConnectionStatus, JobConnectionType } from '.';

@ObjectType()
export class JobConnection {
  @Field()
  jobId: string;

  @Field()
  tutorId: string;

  @Field(() => ConnectionStatus)
  status: ConnectionStatusPrisma;

  @Field(() => JobConnectionType)
  type: JobConnectionTypePrisma;
}
