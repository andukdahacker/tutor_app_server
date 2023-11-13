import { ApiProperty } from '@nestjs/swagger';
import { TutorProfile } from '@prisma/client';

export class TutorProfileEntity implements TutorProfile {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  bio: string;

  constructor({ ...data }: TutorProfileEntity) {
    Object.assign(this, data);
  }
}
