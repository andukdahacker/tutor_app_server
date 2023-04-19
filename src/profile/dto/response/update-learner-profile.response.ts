import { Field, ObjectType } from '@nestjs/graphql';
import { LearnerProfile } from '../entities/learner-profile.entity';

@ObjectType()
export class UpdateLearnerProfileResponse {
  @Field({ nullable: true })
  learnerProfile?: LearnerProfile;
}
