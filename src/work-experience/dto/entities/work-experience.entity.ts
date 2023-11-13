import { ApiProperty } from '@nestjs/swagger';
import { WorkExperience } from '@prisma/client';
import { Transform } from 'class-transformer';
import { ToTimestamp } from 'src/shared/utils/transform.utils';

export class WorkExperienceEntity implements WorkExperience {
  @ApiProperty()
  description: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  position: string;

  @ApiProperty()
  workplace: string;

  @ApiProperty()
  workplaceUrl: string;

  @ApiProperty({ type: Number })
  @Transform(ToTimestamp)
  fromDate: Date;

  @ApiProperty({ type: Number })
  @Transform(ToTimestamp)
  toDate: Date;

  constructor(workExperience: WorkExperienceEntity) {
    Object.assign(this, workExperience);
  }
}
