import { Field, ObjectType } from '@nestjs/graphql';
import { TutorRequestConnection } from '../entities';

@ObjectType()
export class DeclineTutorRequestConnectinoResponse {
  @Field({ nullable: true })
  tutorRequestConnection?: TutorRequestConnection;
}
