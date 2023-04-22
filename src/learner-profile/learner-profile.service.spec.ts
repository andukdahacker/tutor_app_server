import { Test, TestingModule } from '@nestjs/testing';
import { LearnerProfileService } from './learner-profile.service';

describe('ProfileService', () => {
  let service: LearnerProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LearnerProfileService],
    }).compile();

    service = module.get<LearnerProfileService>(LearnerProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
