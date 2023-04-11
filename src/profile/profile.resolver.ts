import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ITokenPayload } from 'src/auth/types/ITokenPayload';
import { TokenPayload } from 'src/shared/decorators/current-user.decorator';
import { CreateLearnerProfileInput } from './dto/inputs/create-learner-profile.input';
import { CreateLeanerProfileResponse } from './dto/response/create-learner-profile.entity';
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
}
