import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { LearnerProfileService } from 'src/learner-profile/learner-profile.service';
import { TutorProfileService } from 'src/tutor-profile/tutor-profile.service';
import { User } from './dto/entities';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly tutorProfileService: TutorProfileService,
    private readonly learnerProfileService: LearnerProfileService,
  ) {}

  @ResolveField()
  async tutorProfile(@Parent() user: User) {
    return await this.tutorProfileService.findTutorProfileByUserId(user.id);
  }

  @ResolveField()
  async learnerProfile(@Parent() user: User) {
    return await this.learnerProfileService.findLearnerProfileByUserId(user.id);
  }
}
