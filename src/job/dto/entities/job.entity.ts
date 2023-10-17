import {
  JobMethod as JobMethodPrisma,
  JobStatus as JobStatusPrisma,
  JobType as JobTypePrisma,
} from '@prisma/client';
import { LearnerProfile } from 'src/learner-profile/dto/entities';

export class Job {
  id: string;

  learner?: LearnerProfile;

  learnerId: string;

  subjectId: string;

  title: string;

  description?: string;

  fee: bigint;

  numberOfSessions?: number;

  createdAt: Date;

  updatedAt: Date;

  jobType: JobTypePrisma;

  jobMethod: JobMethodPrisma;

  jobStatus: JobStatusPrisma;
}
