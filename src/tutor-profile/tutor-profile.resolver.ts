import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Subject } from '@prisma/client';
import DataLoader from 'dataloader';
import { ITokenPayload } from 'src/auth/types';
import { JobConnection } from 'src/connection/dto/entities';
import { Loader } from 'src/dataloader/dataloader';
import { TokenPayload } from 'src/shared/decorators/current-user.decorator';
import { Public } from 'src/shared/decorators/public.decorator';
import { paginate } from 'src/shared/utils/pagination.utils';
import { User } from 'src/user/dto/entities';
import { TutorProfile } from './dto/entities';
import {
  CreateTutorProfileInput,
  FindManyTutorProfilesInput,
  UpdateTutorProfileInput,
} from './dto/inputs';
import { FindManyTutorProfilesResponse } from './dto/response';
import {
  JobConnectionsByTutorLoader,
  TutorProfileSubjectsByTutorLoader,
  UserByTutorLoader,
} from './loaders';
import { TutorProfileService } from './tutor-profile.service';
@Resolver(() => TutorProfile)
export class TutorProfileResolver {
  constructor(private readonly tutorProfileService: TutorProfileService) {}

  @Mutation(() => TutorProfile, { nullable: true })
  async createTutorProfile(
    @Args('createTutorProfileInput') input: CreateTutorProfileInput,
    @TokenPayload() payload: ITokenPayload,
  ) {
    const profile = await this.tutorProfileService.createTutorProfile(
      input,
      payload.userId,
    );

    return profile;
  }

  @Mutation(() => TutorProfile, { nullable: true })
  async updateTutorProfile(
    @Args('updateTutorProfileInput') input: UpdateTutorProfileInput,
    @TokenPayload() payload: ITokenPayload,
  ) {
    const profile = await this.tutorProfileService.updateTutorProfile(
      input,
      payload.userId,
    );

    return profile;
  }

  @Query(() => FindManyTutorProfilesResponse)
  @Public()
  async tutorProfiles(
    @Args('findManyTutorProfilesInput') input: FindManyTutorProfilesInput,
  ): Promise<FindManyTutorProfilesResponse> {
    const profiles = await this.tutorProfileService.findManyTutorProfiles(
      input,
    );
    delete input.stringCursor;
    return await paginate(
      profiles,
      'id',
      async (cursor: string) =>
        await this.tutorProfileService.findManyTutorProfiles({
          stringCursor: cursor,
          ...input,
        }),
    );
  }

  @ResolveField()
  async user(
    @Parent() tutorProfile: TutorProfile,
    @Loader(UserByTutorLoader) loader: DataLoader<string, User>,
  ) {
    const user = loader.load(tutorProfile.id);

    return user;
  }

  @ResolveField(() => [JobConnection], { nullable: 'itemsAndList' })
  async jobConnections(
    @Parent() tutorProfile: TutorProfile,
    @Loader(JobConnectionsByTutorLoader)
    loader: DataLoader<string, JobConnection[]>,
  ) {
    const { id } = tutorProfile;

    const connections = loader.load(id);

    return connections;
  }

  @ResolveField()
  async tutorProfileSubjects(
    @Parent() tutorProfile: TutorProfile,
    @Loader(TutorProfileSubjectsByTutorLoader)
    loader: DataLoader<string, Subject>,
  ) {
    const { id } = tutorProfile;

    const subjects = loader.load(id);

    return subjects;
  }
}
