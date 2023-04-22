import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ITokenPayload } from 'src/auth/types/ITokenPayload';
import { TokenPayload } from 'src/shared/decorators/current-user.decorator';
import {
  CreateLearnerProfileInput,
  UpdateLearnerProfileInput,
} from './dto/inputs';
import {
  CreateLeanerProfileResponse,
  UpdateLearnerProfileResponse,
} from './dto/response';
import { LearnerProfileService } from './learner-profile.service';

@Resolver()
export class LearnerProfileResolver {
  constructor(private readonly profileService: LearnerProfileService) {}
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
}
