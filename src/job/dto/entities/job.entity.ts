import {
  Field,
  GraphQLTimestamp,
  HideField,
  Int,
  ObjectType,
} from '@nestjs/graphql';

import {
  JobMethod as JobMethodPrisma,
  JobStatus as JobStatusPrisma,
  JobType as JobTypePrisma,
} from '@prisma/client';
import { GraphQLBigInt } from 'graphql-scalars';
import { JobConnection } from 'src/connection/dto/entities';
import { LearnerProfile } from 'src/learner-profile/dto/entities';
import { Subject } from 'src/subject/dto/entities';
import { JobMethod, JobStatus, JobType } from '.';

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

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => GraphQLBigInt)
  fee: bigint;

  @Field(() => Int, { nullable: true })
  numberOfSessions?: number;

  @Field(() => GraphQLTimestamp)
  createdAt: Date;

  @Field(() => GraphQLTimestamp)
  updatedAt: Date;

  @Field(() => JobType)
  jobType: JobTypePrisma;

  @Field(() => JobMethod)
  jobMethod: JobMethodPrisma;

  @Field(() => JobStatus)
  jobStatus: JobStatusPrisma;

  @Field(() => [JobConnection], { nullable: 'itemsAndList' })
  connections?: JobConnection[];
}
