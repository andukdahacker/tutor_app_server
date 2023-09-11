import { Test, TestingModule } from '@nestjs/testing';
import { LearnerProfileController } from './learner-profile.controller';

describe('ProfileResolver', () => {
  let resolver: LearnerProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LearnerProfileController],
    }).compile();

    resolver = module.get<LearnerProfileController>(LearnerProfileController);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
