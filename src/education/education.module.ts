import { Module } from '@nestjs/common';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';

@Module({
  providers: [EducationController, EducationService],
})
export class EducationModule {}
