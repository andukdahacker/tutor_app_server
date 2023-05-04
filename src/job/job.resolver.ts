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
  constructor(private readonly tutorRequestService: JobService) {}

  @Mutation(() => CreateJobResponse)
  async createTutorRequest(
    @Args('createTutorRequestInput') input: CreateJobInput,
  ) {
    const tutorRequest = await this.tutorRequestService.createTutorRequest(
      input,
    );
    return {
      tutorRequest,
    };
  }

  @Query(() => FindJobResponse)
  async findManyTutorRequests(
    @Args('findManyTutorRequestsInput') input: FindManyJobsInput,
  ): Promise<FindJobResponse> {
    const requests = await this.tutorRequestService.findManyTutorRequests(
      input,
    );

    if (requests.length > 0) {
      const lastRequest = requests[requests.length - 1];
      const cursor = lastRequest.id;
      const nextQuery = await this.tutorRequestService.findManyTutorRequests({
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
    @Parent() tutorRequest: Job,
    @Loaders() loaders: IDataloader,
  ): Promise<LearnerProfile> {
    return loaders.leanerProfileByTutorRequestLoader.load(
      tutorRequest.learnerId,
    );
  }

  @ResolveField()
  async subject(
    @Parent() tutorRequest: Job,
    @Loaders() loaders: IDataloader,
  ): Promise<Subject> {
    const { subjectId } = tutorRequest;
    const subject = loaders.subjectByTutorRequestLoader.load(subjectId);
    return subject;
  }

  @ResolveField(() => [JobConnection], { nullable: 'itemsAndList' })
  async connections(
    @Parent() tutorRequest: Job,
    @Loaders() loaders: IDataloader,
  ): Promise<JobConnection[]> {
    const { id } = tutorRequest;
    return loaders.connectionsByTutorRequestLoader.load(id);
  }
}
