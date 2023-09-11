import { Module } from '@nestjs/common';
import { WorkExperienceController } from './work-experience.controller';
import { WorkExperienceService } from './work-experience.service';

@Module({
  providers: [WorkExperienceController, WorkExperienceService],
})
export class WorkExperienceModule {}
