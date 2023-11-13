import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import {
  ApiOkPaginatedResponse,
  Paginated,
} from 'src/shared/types/pagination.type';
import { paginate } from 'src/shared/utils/pagination.utils';
import { JobEntity } from './dto/entities';
import { CreateJobInput } from './dto/inputs';
import { FindManyJobsInput } from './dto/inputs/find-many-jobs.input';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @ApiOkResponse({ type: () => JobEntity })
  async createJob(
    @Body() input: CreateJobInput,
    @Req() req,
  ): Promise<JobEntity> {
    console.log(req.user.userId);
    const job = await this.jobService.createJob(input, req.user.userId);
    return new JobEntity(job);
  }

  @Get()
  @ApiOkPaginatedResponse(JobEntity)
  async jobs(@Query() input: FindManyJobsInput): Promise<Paginated<JobEntity>> {
    const requests = await this.jobService.findManyJobs(input);

    const results = await paginate(
      requests,
      'id',
      async (cursor: string) =>
        await this.jobService.findManyJobs({
          stringCursor: cursor,
          ...input,
        }),
    );

    return results;
  }
}
