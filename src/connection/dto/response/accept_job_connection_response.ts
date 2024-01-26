import { JobEntity } from 'src/job/dto/entities';
import { JobConnectionEntity } from '../entities';
import { ApiProperty } from '@nestjs/swagger';

class AcceptJobConnectionResponse {
  @ApiProperty({ type: () => JobConnectionEntity })
  jobConnection: JobConnectionEntity;

  @ApiProperty({ type: () => JobEntity })
  job: JobEntity;

  constructor(job: JobEntity, jobConnection: JobConnectionEntity) {
    this.jobConnection = new JobConnectionEntity(jobConnection);

    this.job = new JobEntity(job);
  }
}

export default AcceptJobConnectionResponse;
