import { ApiProperty } from '@nestjs/swagger';

export class DeleteJobConnectionInput {
  @ApiProperty()
  jobId: string;

  @ApiProperty()
  tutorId: string;
}
