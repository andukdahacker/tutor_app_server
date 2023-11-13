import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateLearnerProfileInput {
  @ApiProperty()
  @IsString()
  bio: string;
}
