import { Field, ObjectType } from '@nestjs/graphql';
import {
  LearnerProfile as LearnerProfilePrisma,
  TutorProfile as TutorProfilePrisma,
} from '@prisma/client';
import { LearnerProfile } from 'src/learner-profile/dto/entities';
import { TutorProfile } from 'src/tutor-profile/dto/entities';
@ObjectType()
export class User {
  @Field(() => String)
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field(() => Boolean)
  isVerified: boolean;

  @Field(() => TutorProfile, { nullable: true })
  tutorProfile?: TutorProfilePrisma;

  @Field(() => LearnerProfile, { nullable: true })
  learnerProfile?: LearnerProfilePrisma;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
