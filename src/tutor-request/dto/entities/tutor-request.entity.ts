import { Field, GraphQLTimestamp, Int, ObjectType } from '@nestjs/graphql';
import { TutorRequestConnection } from 'src/connection/dto/entities';
import { LearnerProfile } from 'src/profile/dto/entities';
import { Subject } from 'src/subject/dto/entities';

@ObjectType()
export class TutorRequest {
  @Field()
  id: string;

  @Field(() => LearnerProfile)
  learner: LearnerProfile;

  @Field()
  learnerId: string;

  @Field(() => Subject)
  subject: Subject;

  @Field(() => Int)
  subjectId: number;

  @Field(() => GraphQLTimestamp)
  createdAt: number;

  @Field(() => [TutorRequestConnection], { nullable: true })
  connections?: TutorRequestConnection[];
}
