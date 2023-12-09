import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorResponse } from 'src/shared/types/error_response';
import {
  ApiOkPaginatedResponse,
  Paginated,
} from 'src/shared/types/pagination.type';
import { paginate } from 'src/shared/utils/pagination.utils';
import { JobEntity } from './dto/entities';
import { CreateJobInput } from './dto/inputs';
import { FindManyJobsInput } from './dto/inputs/find-many-jobs.input';
import { JobService } from './job.service';

@ApiTags('Job')
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @ApiOkResponse({ type: () => JobEntity })
  @ApiUnauthorizedResponse({ type: ErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  async createJob(
    @Body() input: CreateJobInput,
    @Req() req,
  ): Promise<JobEntity> {
    const job = await this.jobService.createJob(input, req.user.userId);
    return new JobEntity(job);
  }

  @Get()
  @ApiOkPaginatedResponse(JobEntity)
  @ApiUnauthorizedResponse({ type: ErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  async jobs(@Query() input: FindManyJobsInput): Promise<Paginated<JobEntity>> {
    const requests = await this.jobService.findManyJobs(input);
    const results = await paginate(
      requests,
      'id',
      async (cursor: string) =>
        await this.jobService.findManyJobs({
          ...input,
          stringCursor: cursor,
        }),
    );

    return results;
  }
}
