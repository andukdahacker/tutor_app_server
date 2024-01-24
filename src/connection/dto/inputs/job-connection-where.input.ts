import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ConnectionStatus, JobConnectionType, JobStatus } from '@prisma/client';
import { Transform } from 'class-transformer';

export class JobConnectionWhereInput {
  @ApiPropertyOptional()
  tutorId?: string;

  @ApiPropertyOptional()
  jobId?: string;

  @ApiPropertyOptional({
    enum: JobConnectionType,
    enumName: 'JobConnectionType',
  })
  type?: JobConnectionType;

  @ApiPropertyOptional({ enum: ConnectionStatus, enumName: 'ConnectionStatus' })
  status?: ConnectionStatus;

  @ApiPropertyOptional({ enum: JobStatus, enumName: 'JobStatus' })
  jobStatus?: JobStatus;

  @ApiProperty()
  @Transform((params) => Number.parseInt(params.value))
  take: number;

  @ApiPropertyOptional()
  stringCursor?: string;
}
