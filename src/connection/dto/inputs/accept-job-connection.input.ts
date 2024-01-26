import { ApiProperty } from '@nestjs/swagger';
import { JobConnectionType } from '@prisma/client';

export class AcceptJobConnectionInput {
  @ApiProperty()
  jobId: string;

  @ApiProperty()
  tutorUserId: string;

  @ApiProperty()
  tutorId: string;

  @ApiProperty()
  learnerUserId: string;

  @ApiProperty({ enum: JobConnectionType, enumName: 'JobConnectionType' })
  type: JobConnectionType;
}
