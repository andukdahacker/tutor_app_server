import { Module } from '@nestjs/common';
import { TutorProfileSubjectResolver } from './tutor-profile-subject.resolver';
import { TutorProfileResolver } from './tutor-profile.resolver';
import { TutorProfileService } from './tutor-profile.service';

@Module({
  providers: [
    TutorProfileService,
    TutorProfileResolver,
    TutorProfileSubjectResolver,
  ],
})
export class TutorProfileModule {}
