import { Field, ObjectType } from '@nestjs/graphql';
import { JobConnection } from '../entities';

@ObjectType()
export class DeclineJobConnectinoResponse {
  @Field({ nullable: true })
  tutorRequestConnection?: JobConnection;
}
