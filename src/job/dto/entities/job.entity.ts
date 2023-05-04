import {
  Field,
  GraphQLTimestamp,
  HideField,
  ObjectType,
} from '@nestjs/graphql';
import { JobConnection } from 'src/connection/dto/entities';
import { LearnerProfile } from 'src/learner-profile/dto/entities';
import { Subject } from 'src/subject/dto/entities';

@ObjectType()
export class Job {
  @Field()
  id: string;

  @Field(() => LearnerProfile)
  learner?: LearnerProfile;

  @HideField()
  learnerId: string;

  @Field(() => Subject)
  subject?: Subject;

  @HideField()
  subjectId: string;

  @Field(() => GraphQLTimestamp)
  createdAt: Date;

  @Field(() => [JobConnection], { nullable: 'itemsAndList' })
  connections?: JobConnection[];
}
