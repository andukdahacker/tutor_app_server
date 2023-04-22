import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { TutorRequestConnection } from '@prisma/client';
import { LearnerProfile } from 'src/learner-profile/dto/entities';
import { LearnerProfileService } from 'src/learner-profile/learner-profile.service';
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
    private readonly profileService: LearnerProfileService,
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

  @ResolveField()
  async learner(@Parent() tutorRequest: TutorRequest): Promise<LearnerProfile> {
    const { id } = tutorRequest;

    return await this.profileService.findLearnerProfile(id);
  }

  @ResolveField()
  async subject(@Parent() tutorRequest: TutorRequest): Promise<Subject> {
    const { subjectId } = tutorRequest;

    return await this.subjectService.findSubject({ id: subjectId });
  }

  @ResolveField()
  async connections(
    @Parent() tutorRequest: TutorRequest,
  ): Promise<TutorRequestConnection[]> {
    const { id } = tutorRequest;
    return await this.tutorRequestService.findTutorRequestConnections(id);
  }
}
