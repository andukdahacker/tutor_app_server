import { ApiProperty } from '@nestjs/swagger';
import { JobMethod, JobType } from '@prisma/client';

export class CreateJobInput {
  @ApiProperty()
  subjectId: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  fee: bigint;

  @ApiProperty()
  title: string;

  @ApiProperty()
  numberOfSessions?: number;

  @ApiProperty({ enum: JobType, enumName: 'JobType' })
  jobType: JobType;

  @ApiProperty({ enum: JobMethod, enumName: 'JobMethod' })
  jobMethod: JobMethod;
}
