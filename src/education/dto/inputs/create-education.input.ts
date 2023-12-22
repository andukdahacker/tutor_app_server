import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateEducationInput {
  @ApiProperty()
  title: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  educationEntity: string;

  @ApiPropertyOptional()
  educationEntityUrl?: string;

  @ApiProperty({ type: String })
  @Transform((params) => new Date(params.value))
  fromDate: Date;

  @ApiPropertyOptional({ type: String, nullable: true })
  @Transform((params) => (params.value == '' ? null : new Date(params.value)))
  toDate?: Date;

  @ApiProperty({ type: Boolean })
  isCurrent: boolean;
}
