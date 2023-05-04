import { Field, ObjectType } from '@nestjs/graphql';
import { JobConnection } from '../entities';

@ObjectType()
export class AcceptJobConnectionResponse {
  @Field({ nullable: true })
  tutorRequestConnection: JobConnection;
}
