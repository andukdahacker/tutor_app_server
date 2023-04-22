import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ITokenPayload } from 'src/auth/types';
import { IDataloader } from 'src/dataloader/types/IDataloader';
import { TokenPayload } from 'src/shared/decorators/current-user.decorator';
import { Loaders } from 'src/shared/decorators/dataloader.decorator';
import { TutorProfile } from './dto/entities';
import { CreateTutorProfileInput } from './dto/inputs/create-tutor-profile.input';
import { UpdateTutorProfileInput } from './dto/inputs/update-tutor-profile-input';
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

  @Query(() => [TutorProfile], { nullable: 'itemsAndList' })
  async findManyTutorProfiles(@Args('searchString') input: string) {
    const profiles = await this.tutorProfileService.findManyTutorProfiles(
      input,
    );

    return profiles;
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

  @ResolveField()
  async tutorRequestConnections(
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
