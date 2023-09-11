import { Test, TestingModule } from '@nestjs/testing';
import { WorkExperienceController } from './work-experience.controller';
import { WorkExperienceService } from './work-experience.service';

describe('WorkExperienceResolver', () => {
  let resolver: WorkExperienceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkExperienceController, WorkExperienceService],
    }).compile();

    resolver = module.get<WorkExperienceController>(WorkExperienceController);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
