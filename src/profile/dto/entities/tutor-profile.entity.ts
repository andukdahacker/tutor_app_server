import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TutorProfile {
  @Field({ nullable: true })
  bio?: string;
}
