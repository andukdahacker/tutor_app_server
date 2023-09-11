import { Module } from '@nestjs/common';
import { TutorProfileController } from './tutor-profile.controller';
import { TutorProfileService } from './tutor-profile.service';

@Module({
  providers: [TutorProfileService, TutorProfileController],
})
export class TutorProfileModule {}
