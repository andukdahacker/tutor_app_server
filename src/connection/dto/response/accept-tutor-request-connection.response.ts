import { Field, ObjectType } from '@nestjs/graphql';
import { TutorRequestConnection } from '../entities';

@ObjectType()
export class AcceptTutorRequestConnectionResponse {
  @Field({ nullable: true })
  tutorRequestConnection: TutorRequestConnection;
}
