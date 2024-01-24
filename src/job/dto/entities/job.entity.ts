import { ApiProperty } from '@nestjs/swagger';
import { Job, JobMethod, JobStatus, JobType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { JobConnectionEntity } from 'src/connection/dto/entities';

import { LearnerProfileEntity } from 'src/learner-profile/dto/entities';
import { ToTimestamp } from 'src/shared/utils/transform.utils';
import { SubjectEntity } from 'src/subject/dto/entities';

export class JobEntity implements Job {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: () => LearnerProfileEntity })
  learner?: LearnerProfileEntity;

  @ApiProperty()
  learnerId: string;

  @ApiProperty()
  subjectId: string;

  @ApiProperty({ type: () => SubjectEntity })
  subject?: SubjectEntity;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  fee: bigint;

  @ApiProperty()
  numberOfSessions: number;

  @ApiProperty({ type: 'number' })
  @Transform(ToTimestamp)
  createdAt: Date;

  @ApiProperty({ type: 'number' })
  @Transform(ToTimestamp)
  updatedAt: Date;

  @ApiProperty({ enum: JobType, enumName: 'JobType' })
  jobType: JobType;

  @ApiProperty({ enum: JobMethod, enumName: 'JobMethod' })
  jobMethod: JobMethod;

  @ApiProperty({ enum: JobStatus, enumName: 'JobStatus' })
  jobStatus: JobStatus;

  @ApiProperty({ type: () => [JobConnectionEntity] })
  jobConnections?: JobConnectionEntity[];

  constructor({
    learner,
    subject,
    jobConnections,
    ...data
  }: Partial<JobEntity>) {
    Object.assign(this, data);

    if (learner) {
      this.learner = new LearnerProfileEntity(learner);
    }

    if (subject) {
      this.subject = new SubjectEntity(subject);
    }

    if (jobConnections) {
      this.jobConnections = jobConnections?.map(
        (connection) => new JobConnectionEntity(connection),
      );
    }
  }
}
