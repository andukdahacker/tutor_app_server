import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class FindManySubjectsInput {
  @ApiProperty()
  @Transform((params) => Number.parseInt(params.value))
  take: number;

  @ApiPropertyOptional()
  stringCursor?: string;

  @ApiProperty()
  searchString: string;
}
