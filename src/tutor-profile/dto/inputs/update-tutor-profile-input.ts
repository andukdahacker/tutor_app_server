import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTutorProfileInput {
  @ApiPropertyOptional()
  bio?: string;

  @ApiPropertyOptional({ type: [String] })
  subjectIds?: string[];
}
