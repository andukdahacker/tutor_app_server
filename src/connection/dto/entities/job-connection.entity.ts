import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ConnectionStatus,
  JobConnection,
  JobConnectionType,
} from '@prisma/client';
import { Transform } from 'class-transformer';
import { JobEntity } from 'src/job/dto/entities';
import { ToTimestamp } from 'src/shared/utils/transform.utils';
import { TutorProfileEntity } from 'src/tutor-profile/dto/entities/tutor-profile.entity';

export class JobConnectionEntity implements JobConnection {
  @ApiProperty()
  jobId: string;

  @ApiPropertyOptional({ type: () => JobEntity })
  job?: JobEntity;

  @ApiProperty()
  tutorId: string;

  @ApiPropertyOptional({ type: () => TutorProfileEntity })
  tutor?: TutorProfileEntity;

  @ApiProperty({ enum: ConnectionStatus, enumName: 'ConnectionStatus' })
  status: ConnectionStatus;

  @ApiProperty({ enum: JobConnectionType, enumName: 'JobConnectionType' })
  type: JobConnectionType;

  @ApiProperty({ type: Number })
  @Transform(ToTimestamp)
  createdAt: Date;

  constructor({ job, tutor, ...data }: JobConnectionEntity) {
    Object.assign(this, data);

    if (job) {
      this.job = new JobEntity(job);
    }

    if (tutor) {
      this.tutor = new TutorProfileEntity(tutor);
    }
  }
}
