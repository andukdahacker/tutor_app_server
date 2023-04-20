import { Field, ObjectType } from '@nestjs/graphql';
import { TutorRequest } from '../entities';

@ObjectType()
export class CreateTutorRequestResponse {
  @Field({ nullable: true })
  tutorRequest?: TutorRequest;
}
