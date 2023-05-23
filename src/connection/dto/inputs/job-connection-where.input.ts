import { Field, InputType, OmitType } from '@nestjs/graphql';
import { ConnectionStatus, JobConnectionType } from '@prisma/client';
import { PaginatedArgs } from 'src/shared/types/paginated-args.type';

@InputType()
export class JobConnectionWhereInput extends OmitType(PaginatedArgs, [
  'intCursor',
] as const) {
  @Field({ nullable: true })
  tutorId?: string;

  @Field({ nullable: true })
  jobId?: string;

  @Field({ nullable: true })
  type?: JobConnectionType;

  @Field({ nullable: true })
  status?: ConnectionStatus;
}
