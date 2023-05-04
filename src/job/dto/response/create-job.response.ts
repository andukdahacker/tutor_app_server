import { Field, ObjectType } from '@nestjs/graphql';
import { Job } from '../entities';

@ObjectType()
export class CreateJobResponse {
  @Field({ nullable: true })
  job?: Job;
}
