import { ApiPropertyOptional } from '@nestjs/swagger';
import { JobMethod } from '@prisma/client';
import { Transform } from 'class-transformer';

export class UpdateTutorProfileInput {
  @ApiPropertyOptional()
  bio?: string;

  @ApiPropertyOptional({ type: [String] })
  subjectIds?: string[];

  @ApiPropertyOptional()
  @Transform(function (param) {
    return BigInt(param.value);
  })
  tutorFee?: bigint;

  @ApiPropertyOptional({ enum: JobMethod, enumName: 'JobMethod' })
  jobMethod?: JobMethod;
}
