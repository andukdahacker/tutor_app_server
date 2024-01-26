import { ApiProperty } from '@nestjs/swagger';

class GetAcceptedJobConnectionInput {
  @ApiProperty()
  jobId: string;
}

export default GetAcceptedJobConnectionInput;
