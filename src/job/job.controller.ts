import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { paginate } from 'src/shared/utils/pagination.utils';
import { CreateJobInput } from './dto/inputs';
import { FindManyJobsInput } from './dto/inputs/find-many-jobs.input';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  async createJob(@Body() input: CreateJobInput) {
    const job = await this.jobService.createJob(input);
    return {
      job,
    };
  }

  @Get()
  async jobs(@Query() input: FindManyJobsInput) {
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

    return {
      statusCode: 200,
      data: results,
    };
  }
}
