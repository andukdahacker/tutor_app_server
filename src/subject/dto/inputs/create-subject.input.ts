import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSubjectInput {
  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;
}
