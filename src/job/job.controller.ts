import { Body, Controller, Get, Post } from '@nestjs/common';
import { paginate } from 'src/shared/utils/pagination.utils';
import { CreateJobInput } from './dto/inputs';
import { FindManyJobsInput } from './dto/inputs/find-many-jobs.input';
import { FindJobResponse } from './dto/response/find-job.response';
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
  async jobs(@Body() input: FindManyJobsInput): Promise<FindJobResponse> {
    const requests = await this.jobService.findManyJobs(input);

    return await paginate(
      requests,
      'id',
      async (cursor: string) =>
        await this.jobService.findManyJobs({
          stringCursor: cursor,
          ...input,
        }),
    );
  }
}
