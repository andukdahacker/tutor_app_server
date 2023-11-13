import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateLearnerProfileInput {
  @ApiPropertyOptional()
  bio?: string;
}
