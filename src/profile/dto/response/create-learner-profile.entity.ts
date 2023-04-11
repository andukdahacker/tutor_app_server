import { Field, ObjectType } from '@nestjs/graphql';
import { LearnerProfile } from '../entities/learner-profile.entity';

@ObjectType()
export class CreateLeanerProfileResponse {
  @Field(() => LearnerProfile, { nullable: true })
  leanerProfile?: LearnerProfile;
}
