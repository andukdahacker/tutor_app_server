import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ConnectionStatus, JobConnectionType } from '@prisma/client';

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

  @ApiProperty()
  take: number;

  @ApiPropertyOptional()
  stringCursor?: string;
}
