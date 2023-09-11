import {
  JobMethod as JobMethodPrisma,
  JobStatus as JobStatusPrisma,
  JobType as JobTypePrisma,
} from '@prisma/client';
import { JobConnection } from 'src/connection/dto/entities';
import { LearnerProfile } from 'src/learner-profile/dto/entities';
import { Subject } from 'src/subject/dto/entities';

export class Job {
  id: string;

  learner?: LearnerProfile;

  learnerId: string;

  subject?: Subject;

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

  connections?: JobConnection[];
}
