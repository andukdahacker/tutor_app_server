import { Module } from '@nestjs/common';
import { LearnerProfileController } from './learner-profile.controller';
import { LearnerProfileService } from './learner-profile.service';

@Module({
  providers: [LearnerProfileService, LearnerProfileController],
})
export class LearnerProfileModule {}
