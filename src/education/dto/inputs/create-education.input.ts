import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ToTimestamp } from 'src/shared/utils/transform.utils';

export class CreateEducationInput {
  @ApiProperty()
  position: string;

  @ApiProperty()
  workplace: string;

  @ApiPropertyOptional()
  workplaceUrl?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  educationEntity: string;

  @ApiPropertyOptional()
  educationEntityUrl?: string;

  @ApiProperty({ type: Number })
  @Transform(ToTimestamp)
  fromDate: Date;

  @ApiProperty({ type: Number })
  @Transform(ToTimestamp)
  toDate: Date;
}
