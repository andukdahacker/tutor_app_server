import {
  Field,
  GraphQLTimestamp,
  HideField,
  ObjectType,
} from '@nestjs/graphql';
import { TutorRequestConnection } from 'src/connection/dto/entities';
import { LearnerProfile } from 'src/learner-profile/dto/entities';
import { Subject } from 'src/subject/dto/entities';

@ObjectType()
export class TutorRequest {
  @Field()
  id: string;

  @Field(() => LearnerProfile)
  learner: LearnerProfile;

  @HideField()
  learnerId: string;

  @Field(() => Subject)
  subject: Subject;

  @HideField()
  subjectId: number;

  @Field(() => GraphQLTimestamp)
  createdAt: number;

  @Field(() => [TutorRequestConnection], { nullable: 'itemsAndList' })
  connections?: TutorRequestConnection[];
}
