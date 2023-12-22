import { ApiProperty } from '@nestjs/swagger';
import { Education } from '@prisma/client';
import { Transform } from 'class-transformer';
import { ToTimestamp } from 'src/shared/utils/transform.utils';

export class EducationEntity implements Education {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  educationEntity: string;

  @ApiProperty()
  educationEntityUrl: string;

  @ApiProperty({ type: Number })
  @Transform(ToTimestamp)
  fromDate: Date;

  @ApiProperty({ type: Number })
  @Transform(ToTimestamp)
  toDate: Date;

  @ApiProperty({ type: Boolean })
  isCurrent: boolean;

  @ApiProperty()
  description: string;

  constructor(data: EducationEntity) {
    Object.assign(this, data);
  }
}
