import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { ITokenPayload } from 'src/auth/types/ITokenPayload';
import { Loader } from 'src/dataloader/dataloader';
import { TokenPayload } from 'src/shared/decorators/current-user.decorator';
import { User } from 'src/user/dto/entities';
import { LearnerProfile } from './dto/entities';
import {
  CreateLearnerProfileInput,
  UpdateLearnerProfileInput,
} from './dto/inputs';
import { LearnerProfileService } from './learner-profile.service';
import { UserByLearnerLoader } from './loaders';

@Resolver(LearnerProfile)
export class LearnerProfileResolver {
  constructor(private readonly profileService: LearnerProfileService) {}
  @Mutation(() => LearnerProfile)
  async createLearnerProfile(
    @Args('createLearnerProfileInput')
    input: CreateLearnerProfileInput,
    @TokenPayload() payload: ITokenPayload,
  ) {
    return await this.profileService.createLearnerProfile(
      input,
      payload.userId,
    );
  }

  @Mutation(() => LearnerProfile)
  async updateLearnerProfile(
    @Args('updateLearnerProfileInput') input: UpdateLearnerProfileInput,
    @TokenPayload() payload: ITokenPayload,
  ) {
    return await this.profileService.updateLearnerProfile(
      input,
      payload.userId,
    );
  }

  @ResolveField()
  async user(
    @Parent() learner: LearnerProfile,
    @Loader(UserByLearnerLoader) loader: DataLoader<string, User>,
  ) {
    return loader.load(learner.id);
  }
}
