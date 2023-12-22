import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UpdateEducationInput {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  educationEntity: string;

  @ApiPropertyOptional()
  educationEntityUrl?: string;

  @ApiProperty({ type: String })
  @Transform((params) => new Date(params.value))
  fromDate: Date;

  @ApiPropertyOptional({ type: String, nullable: true })
  @Transform((params) => (params.value == '' ? null : new Date(params.value)))
  toDate: Date;

  @ApiPropertyOptional()
  description?: string;
}
