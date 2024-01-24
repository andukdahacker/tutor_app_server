import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { JobMethod, JobStatus, JobType } from '@prisma/client';

export class UpdateJobInput {
  @ApiProperty()
  id: string;

  @ApiPropertyOptional()
  subjectId?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  fee?: bigint;

  @ApiPropertyOptional()
  title?: string;

  @ApiProperty()
  numberOfSessions?: number;

  @ApiPropertyOptional({ enum: JobType, enumName: 'JobType' })
  jobType?: JobType;

  @ApiPropertyOptional({ enum: JobMethod, enumName: 'JobMethod' })
  jobMethod?: JobMethod;

  @ApiPropertyOptional({ enum: JobStatus, enumName: 'JobStatus' })
  jobStatus?: JobStatus;
}
