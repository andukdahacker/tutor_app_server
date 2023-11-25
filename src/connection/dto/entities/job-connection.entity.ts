import { ApiProperty } from '@nestjs/swagger';
import {
  ConnectionStatus,
  JobConnection,
  JobConnectionType,
} from '@prisma/client';
import { Transform } from 'class-transformer';
import { ToTimestamp } from 'src/shared/utils/transform.utils';

export class JobConnectionEntity implements JobConnection {
  @ApiProperty()
  jobId: string;

  @ApiProperty()
  tutorId: string;

  @ApiProperty({ enum: ConnectionStatus, enumName: 'ConnectionStatus' })
  status: ConnectionStatus;

  @ApiProperty({ enum: JobConnectionType, enumName: 'JobConnectionType' })
  type: JobConnectionType;

  @ApiProperty({ type: Number })
  @Transform(ToTimestamp)
  createdAt: Date;

  constructor(jobConnection: JobConnectionEntity) {
    Object.assign(this, jobConnection);
  }
}
