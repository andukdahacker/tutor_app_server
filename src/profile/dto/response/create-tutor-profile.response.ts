import { Field, ObjectType } from '@nestjs/graphql';
import { TutorProfile } from '@prisma/client';

@ObjectType()
export class CreateTutorProfileResponse {
  @Field({ nullable: true })
  tutorProfile: TutorProfile;
}
