import { Field, ObjectType } from '@nestjs/graphql';
import { Subject } from '../entities';

@ObjectType()
export class CreateSubjectResponse {
  @Field({ nullable: true })
  subject?: Subject;
}
