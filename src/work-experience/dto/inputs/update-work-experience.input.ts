import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UpdateWorkExperienceInput {
  @ApiProperty()
  workExperienceId: string;

  @ApiProperty()
  position: string;

  @ApiProperty()
  workplace: string;

  @ApiPropertyOptional()
  workplaceUrl?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty({ type: String })
  @Transform((params) => new Date(params.value))
  fromDate: Date;

  @ApiPropertyOptional({ type: String, nullable: true })
  @Transform((params) => (params.value == '' ? null : new Date(params.value)))
  toDate: Date;

  @ApiProperty({ type: Boolean })
  isCurrent: boolean;
}
