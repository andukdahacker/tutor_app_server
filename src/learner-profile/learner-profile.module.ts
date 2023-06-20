import { Module } from '@nestjs/common';
import { LearnerProfileResolver } from './learner-profile.resolver';
import { LearnerProfileService } from './learner-profile.service';
import { UserByLearnerLoader } from './loaders';

@Module({
  providers: [
    LearnerProfileService,
    LearnerProfileResolver,
    UserByLearnerLoader,
  ],
})
export class LearnerProfileModule {}
