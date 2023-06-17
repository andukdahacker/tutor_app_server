import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { JobConnection } from 'src/connection/dto/entities';
import { LearnerProfile } from 'src/learner-profile/dto/entities';

import DataLoader from 'dataloader';
import { Loader } from 'src/dataloader/dataloader';
import { Public } from 'src/shared/decorators/public.decorator';
import { paginate } from 'src/shared/utils/pagination.utils';
import { Subject } from 'src/subject/dto/entities';
import { Job } from './dto/entities';
import { CreateJobInput } from './dto/inputs';
import { FindManyJobsInput } from './dto/inputs/find-many-jobs.input';
import { CreateJobResponse } from './dto/response';
import { FindJobResponse } from './dto/response/find-job.response';
import { JobService } from './job.service';
import {
  ConnectionsByJobLoader,
  LearnerByJobLoader,
  SubjectByJobLoader,
} from './loaders';

@Resolver(() => Job)
export class JobResolver {
  constructor(private readonly jobService: JobService) {}

  @Mutation(() => CreateJobResponse)
  async createJob(@Args('createJob') input: CreateJobInput) {
    const job = await this.jobService.createJob(input);
    return {
      job,
    };
  }

  @Public()
  @Query(() => FindJobResponse)
  async jobs(
    @Args('findManyJobsInput') input: FindManyJobsInput,
  ): Promise<FindJobResponse> {
    const requests = await this.jobService.findManyJobs(input);
    const { stringCursor, ...newInput } = input;
    return await paginate(requests, 'id', async (cursor: string) => {
      return await this.jobService.findManyJobs({
        stringCursor: cursor,
        ...newInput,
      });
    });
  }

  @ResolveField()
  async learner(
    @Parent() job: Job,
    @Loader(LearnerByJobLoader) loader: DataLoader<string, LearnerProfile>,
  ): Promise<LearnerProfile> {
    return loader.load(job.id);
  }

  @ResolveField()
  async subject(
    @Parent() job: Job,
    @Loader(SubjectByJobLoader) loader: DataLoader<string, Subject>,
  ): Promise<Subject> {
    const subject = loader.load(job.id);
    return subject;
  }

  @ResolveField(() => [JobConnection], { nullable: 'itemsAndList' })
  async connections(
    @Parent() job: Job,
    @Loader(ConnectionsByJobLoader) loader: DataLoader<string, JobConnection[]>,
  ): Promise<JobConnection[]> {
    return loader.load(job.id);
  }
}
