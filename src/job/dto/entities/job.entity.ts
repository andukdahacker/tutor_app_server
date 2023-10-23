import { Job, JobMethod, JobStatus, JobType } from '@prisma/client';
import { Transform } from 'class-transformer';

import { LearnerProfileEntity } from 'src/learner-profile/dto/entities';
import { ToTimestamp } from 'src/shared/utils/transform.utils';
import { SubjectEntity } from 'src/subject/dto/entities';

export class JobEntity implements Job {
  id: string;

  learner?: LearnerProfileEntity;

  learnerId: string;

  subjectId: string;

  subject: SubjectEntity;

  title: string;

  description: string;

  fee: bigint;

  numberOfSessions: number;

  @Transform(ToTimestamp)
  createdAt: Date;

  @Transform(ToTimestamp)
  updatedAt: Date;

  jobType: JobType;

  jobMethod: JobMethod;

  jobStatus: JobStatus;

  constructor({ learner, subject, ...data }: Partial<JobEntity>) {
    Object.assign(this, data);

    if (learner) {
      this.learner = learner;
    }

    this.subject = subject;
  }
}
