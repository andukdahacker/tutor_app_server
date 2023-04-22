import { Module } from '@nestjs/common';
import { ConnectionModule } from 'src/connection/connection.module';
import { ConnectionService } from 'src/connection/connection.service';
import { LearnerProfileModule } from 'src/learner-profile/learner-profile.module';
import { LearnerProfileService } from 'src/learner-profile/learner-profile.service';
import { SubjectModule } from 'src/subject/subject.module';
import { SubjectService } from 'src/subject/subject.service';
import { TutorRequestResolver } from './tutor-request.resolver';
import { TutorRequestService } from './tutor-request.service';

@Module({
  providers: [
    TutorRequestResolver,
    TutorRequestService,
    LearnerProfileService,
    SubjectService,
    ConnectionService,
  ],
  imports: [LearnerProfileModule, SubjectModule, ConnectionModule],
})
export class TutorRequestModule {}
