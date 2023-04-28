import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { TutorRequestConnection } from 'src/connection/dto/entities';
import { IDataloader } from 'src/dataloader/types/IDataloader';
import { LearnerProfile } from 'src/learner-profile/dto/entities';
import { Loaders } from 'src/shared/decorators/dataloader.decorator';

import { Subject } from 'src/subject/dto/entities';
import { TutorRequest } from './dto/entities';
import { CreateTutorRequestInput } from './dto/inputs';
import { FindManyTutorRequestsInput } from './dto/inputs/find-tutor-request.input';
import { CreateTutorRequestResponse } from './dto/response';
import { FindTutorRequestResponse } from './dto/response/find-tutor-request.response';
import { TutorRequestService } from './tutor-request.service';

@Resolver(() => TutorRequest)
export class TutorRequestResolver {
  constructor(private readonly tutorRequestService: TutorRequestService) {}

  @Mutation(() => CreateTutorRequestResponse)
  async createTutorRequest(
    @Args('createTutorRequestInput') input: CreateTutorRequestInput,
  ) {
    const tutorRequest = await this.tutorRequestService.createTutorRequest(
      input,
    );
    return {
      tutorRequest,
    };
  }

  @Query(() => FindTutorRequestResponse)
  async findManyTutorRequests(
    @Args('findManyTutorRequestsInput') input: FindManyTutorRequestsInput,
  ): Promise<FindTutorRequestResponse> {
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
    @Parent() tutorRequest: TutorRequest,
    @Loaders() loaders: IDataloader,
  ): Promise<LearnerProfile> {
    return loaders.leanerProfileByTutorRequestLoader.load(
      tutorRequest.learnerId,
    );
  }

  @ResolveField()
  async subject(
    @Parent() tutorRequest: TutorRequest,
    @Loaders() loaders: IDataloader,
  ): Promise<Subject> {
    const { subjectId } = tutorRequest;
    const subject = loaders.subjectByTutorRequestLoader.load(subjectId);
    return subject;
  }

  @ResolveField(() => [TutorRequestConnection], { nullable: 'itemsAndList' })
  async connections(
    @Parent() tutorRequest: TutorRequest,
    @Loaders() loaders: IDataloader,
  ): Promise<TutorRequestConnection[]> {
    const { id } = tutorRequest;
    return loaders.connectionsByTutorRequestLoader.load(id);
  }
}
