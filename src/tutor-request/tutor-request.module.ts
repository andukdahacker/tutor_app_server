import { Module } from '@nestjs/common';
import { TutorRequestService } from './tutor-request.service';
import { TutorRequestResolver } from './tutor-request.resolver';

@Module({
  providers: [TutorRequestResolver, TutorRequestService]
})
export class TutorRequestModule {}
