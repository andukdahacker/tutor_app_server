import { ApiProperty } from '@nestjs/swagger';

class DisconnectJobConnectionInput {
  @ApiProperty()
  jobId: string;

  @ApiProperty()
  tutorId: string;
}

export default DisconnectJobConnectionInput;
