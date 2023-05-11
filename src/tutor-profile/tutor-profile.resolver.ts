import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ITokenPayload } from 'src/auth/types';
import { JobConnection } from 'src/connection/dto/entities';
import { IDataloader } from 'src/dataloader/types/IDataloader';
import { TokenPayload } from 'src/shared/decorators/current-user.decorator';
import { Loaders } from 'src/shared/decorators/dataloader.decorator';
import { TutorProfile } from './dto/entities';
import { FindManyTutorProfilesInput } from './dto/inputs';
import { CreateTutorProfileInput } from './dto/inputs/create-tutor-profile.input';
import { UpdateTutorProfileInput } from './dto/inputs/update-tutor-profile-input';
import { FindManyTutorProfilesResponse } from './dto/response';
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
  async findManyTutorProfiles(
    @Args('findManyTutorProfilesInput') input: FindManyTutorProfilesInput,
  ): Promise<FindManyTutorProfilesResponse> {
    const profiles = await this.tutorProfileService.findManyTutorProfiles(
      input,
    );

    if (profiles.length > 0) {
      const lastProfiles = profiles[profiles.length - 1];
      const cursor = lastProfiles.id;

      const nextQuery = await this.tutorProfileService.findManyTutorProfiles({
        take: input.take,
        searchString: input.searchString,
        stringCursor: cursor,
      });

      if (nextQuery.length > 0) {
        return {
          nodes: profiles,
          pageInfo: {
            hasNextPage: true,
            lastTake: nextQuery.length,
            totalAmount: profiles.length,
            cursor: {
              value: cursor,
            },
          },
        };
      }
    }

    return {
      nodes: profiles,
      pageInfo: {
        hasNextPage: false,
        lastTake: 0,
        totalAmount: profiles.length,
        cursor: null,
      },
    };
  }

  @ResolveField()
  async user(
    @Parent() tutorProfile: TutorProfile,
    @Loaders() loaders: IDataloader,
  ) {
    const { userId } = tutorProfile;
    const user = loaders.usersLoader.load(userId);

    return user;
  }

  @ResolveField(() => [JobConnection], { nullable: 'itemsAndList' })
  async jobConnections(
    @Parent() tutorProfile: TutorProfile,
    @Loaders() loaders: IDataloader,
  ) {
    const { id } = tutorProfile;

    const connections = loaders.connectionsByTutorIdLoader.load(id);

    return connections;
  }

  @ResolveField()
  async tutorProfileSubject(
    @Parent() tutorProfile: TutorProfile,
    @Loaders() loaders: IDataloader,
  ) {
    const { id } = tutorProfile;

    const subjects = loaders.tutorProfileSubjectByTutorIdLoader.load(id);

    return subjects;
  }
}
