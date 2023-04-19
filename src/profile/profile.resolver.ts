import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ITokenPayload } from 'src/auth/types/ITokenPayload';
import { TokenPayload } from 'src/shared/decorators/current-user.decorator';
import {
  CreateLearnerProfileInput,
  CreateTutorProfileInput,
  UpdateLearnerProfileInput,
  UpdateTutorProfileInput,
} from './dto/inputs';
import {
  CreateLeanerProfileResponse,
  CreateTutorProfileResponse,
  UpdateLearnerProfileResponse,
  UpdateTutorProfileResponse,
} from './dto/response';
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
