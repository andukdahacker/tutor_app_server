import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UpdateEducationInput {
  @ApiProperty()
  id: string;

  @ApiProperty()
  educationEntity: string;

  @ApiPropertyOptional()
  educationEntityUrl?: string;

  @ApiProperty({ type: Number })
  @Transform((params) => new Date(params.value))
  fromDate: Date;

  @ApiProperty({ type: Number })
  @Transform((params) => new Date(params.value))
  toDate: Date;

  @ApiPropertyOptional()
  description?: string;
}
