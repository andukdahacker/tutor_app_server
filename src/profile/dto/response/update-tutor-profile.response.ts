import { Field, ObjectType } from '@nestjs/graphql';
import { TutorProfile } from '../entities/tutor-profile.entity';

@ObjectType()
export class UpdateTutorProfileResponse {
  @Field({ nullable: true })
  tutorProfile?: TutorProfile;
}
