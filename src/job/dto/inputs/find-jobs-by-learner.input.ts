import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

class FindJobByLearnerInput {
  @ApiProperty()
  @Transform((params) => Number.parseInt(params.value))
  take: number;

  @ApiPropertyOptional()
  stringCursor?: string;
}

export default FindJobByLearnerInput;
