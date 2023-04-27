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
import { SubjectService } from 'src/subject/subject.service';
import { TutorRequest } from './dto/entities';
import { CreateTutorRequestInput } from './dto/inputs';
import { CreateTutorRequestResponse } from './dto/response';
import { TutorRequestService } from './tutor-request.service';

@Resolver(() => TutorRequest)
export class TutorRequestResolver {
  constructor(
    private readonly tutorRequestService: TutorRequestService,
    private readonly subjectService: SubjectService,
  ) {}

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

  @Query(() => [TutorRequest], { nullable: 'itemsAndList' })
  async findTutorRequests(@Args('searchString') input: string) {
    const requests = await this.tutorRequestService.findManyTutorRequests(
      input,
    );

    return requests;
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
