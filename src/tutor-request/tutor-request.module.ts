import { Module } from '@nestjs/common';
import { ConnectionModule } from 'src/connection/connection.module';
import { ConnectionService } from 'src/connection/connection.service';
import { TutorRequestResolver } from './tutor-request.resolver';
import { TutorRequestService } from './tutor-request.service';

@Module({
  providers: [TutorRequestResolver, TutorRequestService, ConnectionService],
  imports: [ConnectionModule],
})
export class TutorRequestModule {}
