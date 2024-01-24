import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiQuery,
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
import FindJobByLearnerInput from './dto/inputs/find-jobs-by-learner.input';
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

  @Get('/list')
  @ApiOkPaginatedResponse(JobEntity)
  @ApiUnauthorizedResponse({ type: ErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  async jobs(
    @Query() input: FindManyJobsInput,
    @Req() req,
  ): Promise<Paginated<JobEntity>> {
    const requests = await this.jobService.findManyJobs(input, req.user.userId);
    const results = await paginate(
      requests,
      'id',
      async (cursor: string) =>
        await this.jobService.findManyJobs(
          {
            ...input,
            stringCursor: cursor,
          },
          req.user.userId,
        ),
    );

    return results;
  }

  @Get('/learner')
  @ApiOkPaginatedResponse(JobEntity)
  @ApiUnauthorizedResponse({ type: ErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @ApiQuery({ type: () => FindJobByLearnerInput })
  async getJobsByLearnerId(@Query() input: FindJobByLearnerInput, @Req() req) {
    const requests = await this.jobService.findJobsByLearnerId(
      input,
      req.user.userId,
    );
    const results = await paginate(
      requests,
      'id',
      async (cursor: string) =>
        await this.jobService.findJobsByLearnerId(
          {
            ...input,
            stringCursor: cursor,
          },
          req.user.userId,
        ),
    );

    return results;
  }

  @Get(':jobId')
  @ApiOkResponse({ type: () => JobEntity })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  async findJobById(@Param('jobId') jobId: string) {
    const job = await this.jobService.findJobById(jobId);

    return new JobEntity(job);
  }
}
