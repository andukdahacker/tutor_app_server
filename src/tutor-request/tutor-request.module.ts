import { Module } from '@nestjs/common';
import { ConnectionModule } from 'src/connection/connection.module';
import { ConnectionService } from 'src/connection/connection.service';
import { ProfileModule } from 'src/profile/profile.module';
import { ProfileService } from 'src/profile/profile.service';
import { SubjectModule } from 'src/subject/subject.module';
import { SubjectService } from 'src/subject/subject.service';
import { TutorRequestResolver } from './tutor-request.resolver';
import { TutorRequestService } from './tutor-request.service';

@Module({
  providers: [
    TutorRequestResolver,
    TutorRequestService,
    ProfileService,
    SubjectService,
    ConnectionService,
  ],
  imports: [ProfileModule, SubjectModule, ConnectionModule],
})
export class TutorRequestModule {}
