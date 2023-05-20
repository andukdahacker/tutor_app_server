import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationResolver } from './education.resolver';

@Module({
  providers: [EducationResolver, EducationService]
})
export class EducationModule {}
