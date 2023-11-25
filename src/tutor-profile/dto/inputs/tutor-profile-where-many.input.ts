import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class FindManyTutorProfilesInput {
  @ApiProperty()
  searchString: string;

  @ApiPropertyOptional()
  stringCursor?: string;

  @ApiProperty()
  @Transform((params) => Number.parseInt(params.value))
  take: number;
}
