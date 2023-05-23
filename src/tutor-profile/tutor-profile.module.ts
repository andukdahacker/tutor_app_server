import { Module } from '@nestjs/common';
import {
  JobConnectionsByTutorLoader,
  TutorProfileSubjectsByTutorLoader,
  UserByTutorLoader,
} from './loaders';
import { SubjectByTutorProfileSubjectLoader } from './loaders/subject-by-tutor-profile-subjects.loader';
import { TutorProfileSubjectResolver } from './tutor-profile-subject.resolver';
import { TutorProfileSubjectService } from './tutor-profile-subject.service';
import { TutorProfileResolver } from './tutor-profile.resolver';
import { TutorProfileService } from './tutor-profile.service';

@Module({
  providers: [
    TutorProfileService,
    TutorProfileResolver,
    TutorProfileSubjectResolver,
    TutorProfileSubjectService,
    UserByTutorLoader,
    TutorProfileSubjectsByTutorLoader,
    SubjectByTutorProfileSubjectLoader,
    JobConnectionsByTutorLoader,
  ],
})
export class TutorProfileModule {}
