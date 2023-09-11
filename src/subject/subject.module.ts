import { Module } from '@nestjs/common';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';

@Module({
  providers: [SubjectController, SubjectService],
})
export class SubjectModule {}
