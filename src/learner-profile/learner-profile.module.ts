import { Module } from '@nestjs/common';
import { LearnerProfileResolver } from './learner-profile.resolver';
import { LearnerProfileService } from './learner-profile.service';

@Module({
  providers: [LearnerProfileService, LearnerProfileResolver],
})
export class LearnerProfileModule {}
