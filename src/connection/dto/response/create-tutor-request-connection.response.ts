import { Field, ObjectType } from '@nestjs/graphql';
import { TutorRequestConnection } from '../entities';

@ObjectType()
export class CreateTutorRequestConnectResponse {
  @Field({ nullable: true })
  tutorRequestConnection?: TutorRequestConnection;
}
