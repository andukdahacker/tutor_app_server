import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ITokenPayload } from 'src/auth/types/ITokenPayload';
import { TokenPayload } from 'src/shared/decorators/current-user.decorator';
import { CreateLearnerProfileInput } from './dto/inputs/create-learner-profile.input';
import { CreateTutorProfileInput } from './dto/inputs/create-tutor-profile.input';
import { UpdateLearnerProfileInput } from './dto/inputs/update-learner-profile-input';
import { UpdateTutorProfileInput } from './dto/inputs/update-tutor-profile-input';
import { CreateLeanerProfileResponse } from './dto/response/create-learner-profile.response';
import { CreateTutorProfileResponse } from './dto/response/create-tutor-profile.response';
import { UpdateLearnerProfileResponse } from './dto/response/update-learner-profile.response';
import { UpdateTutorProfileResponse } from './dto/response/update-tutor-profile.response';
import { ProfileService } from './profile.service';

@Resolver()
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}
  @Mutation(() => CreateLeanerProfileResponse)
  async createLearnerProfile(
    @Args('createLearnerProfileInput')
    input: CreateLearnerProfileInput,
    @TokenPayload() payload: ITokenPayload,
  ): Promise<CreateLeanerProfileResponse> {
    const profile = await this.profileService.createLearnerProfile(
      input,
      payload.userId,
    );

    return {
      leanerProfile: profile,
    };
  }

  @Mutation(() => UpdateLearnerProfileResponse)
  async updateLearnerProfile(
    @Args('updateLearnerProfileInput') input: UpdateLearnerProfileInput,
    @TokenPayload() payload: ITokenPayload,
  ): Promise<UpdateLearnerProfileResponse> {
    const profile = await this.profileService.updateLearnerProfile(
      input,
      payload.userId,
    );

    return {
      learnerProfile: profile,
    };
  }

  @Mutation(() => CreateTutorProfileResponse)
  async createTutorProfile(
    @Args('createTutorProfileInput') input: CreateTutorProfileInput,
    @TokenPayload() payload: ITokenPayload,
  ): Promise<CreateTutorProfileResponse> {
    const profile = await this.profileService.createTutorProfile(
      input,
      payload.userId,
    );

    return {
      tutorProfile: profile,
    };
  }

  @Mutation(() => UpdateTutorProfileResponse)
  async updateTutorProfile(
    @Args('updateTutorProfileInput') input: UpdateTutorProfileInput,
    @TokenPayload() payload: ITokenPayload,
  ): Promise<UpdateTutorProfileResponse> {
    const profile = await this.profileService.updateTutorProfile(
      input,
      payload.userId,
    );

    return {
      tutorProfile: profile,
    };
  }
}
