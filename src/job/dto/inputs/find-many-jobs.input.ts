import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { JobMethod, JobType, Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';

export class FindManyJobsInput {
  @ApiProperty()
  tutorId: string;

  @ApiProperty()
  @Transform((params) => Number.parseInt(params.value))
  take: number;

  @ApiPropertyOptional()
  stringCursor?: string;

  @ApiProperty()
  searchString: string;

  @ApiProperty()
  @Transform(function (param) {
    return BigInt(param.value);
  })
  minFee?: bigint;

  @ApiProperty()
  @Transform(function (param) {
    return BigInt(param.value);
  })
  maxFee?: bigint;

  @ApiPropertyOptional({ enum: JobType, enumName: 'JobType' })
  jobType?: JobType;

  @ApiPropertyOptional({ enum: JobMethod, enumName: 'JobMethod' })
  jobMethod?: JobMethod;

  @ApiProperty({ enum: Prisma.SortOrder, enumName: 'SortBy' })
  sortBy: Prisma.SortOrder;
}
