import { Module } from '@nestjs/common';
import { WorkExperienceController } from './work-experience.controller';
import { WorkExperienceService } from './work-experience.service';

@Module({
  providers: [WorkExperienceService],
  controllers: [WorkExperienceController],
})
export class WorkExperienceModule {}
