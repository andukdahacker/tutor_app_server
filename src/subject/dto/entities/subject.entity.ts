import { ApiProperty } from '@nestjs/swagger';
import { Subject } from '@prisma/client';

export class SubjectEntity implements Subject {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  constructor(subject: SubjectEntity) {
    Object.assign(this, subject);
  }
}
