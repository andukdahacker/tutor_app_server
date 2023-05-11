import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { JobConnection } from 'src/connection/dto/entities';
import { IDataloader } from 'src/dataloader/types/IDataloader';
import { LearnerProfile } from 'src/learner-profile/dto/entities';
import { Loaders } from 'src/shared/decorators/dataloader.decorator';

import { Subject } from 'src/subject/dto/entities';
import { Job } from './dto/entities';
import { CreateJobInput } from './dto/inputs';
import { FindManyJobsInput } from './dto/inputs/find-many-jobs.input';
import { CreateJobResponse } from './dto/response';
import { FindJobResponse } from './dto/response/find-job.response';
import { JobService } from './job.service';

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

  @Query(() => FindJobResponse)
  async findManyJobs(
    @Args('findManyJobsInput') input: FindManyJobsInput,
  ): Promise<FindJobResponse> {
    const requests = await this.jobService.findManyJobs(input);

    if (requests.length > 0) {
      const lastRequest = requests[requests.length - 1];
      const cursor = lastRequest.id;
      const nextQuery = await this.jobService.findManyJobs({
        take: input.take,
        searchString: input.searchString,
        stringCursor: cursor,
      });

      if (nextQuery.length > 0) {
        return {
          nodes: requests,
          pageInfo: {
            hasNextPage: true,
            lastTake: nextQuery.length,
            totalAmount: requests.length,
            cursor: {
              value: cursor,
            },
          },
        };
      }
    }

    return {
      pageInfo: {
        hasNextPage: false,
        lastTake: 0,
        cursor: null,
        totalAmount: requests.length,
      },
      nodes: requests,
    };
  }

  @ResolveField()
  async learner(
    @Parent() job: Job,
    @Loaders() loaders: IDataloader,
  ): Promise<LearnerProfile> {
    return loaders.leanerProfileByJobLoader.load(job.learnerId);
  }

  @ResolveField()
  async subject(
    @Parent() job: Job,
    @Loaders() loaders: IDataloader,
  ): Promise<Subject> {
    const { subjectId } = job;
    const subject = loaders.subjectByJobLoader.load(subjectId);
    return subject;
  }

  @ResolveField(() => [JobConnection], { nullable: 'itemsAndList' })
  async connections(
    @Parent() job: Job,
    @Loaders() loaders: IDataloader,
  ): Promise<JobConnection[]> {
    const { id } = job;
    return loaders.connectionsByJobLoader.load(id);
  }
}
