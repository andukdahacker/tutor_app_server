import { Field, ObjectType } from '@nestjs/graphql';
import { JobConnection } from '../entities';

@ObjectType()
export class CreateJobConnectResponse {
  @Field({ nullable: true })
  tutorRequestConnection?: JobConnection;
}
