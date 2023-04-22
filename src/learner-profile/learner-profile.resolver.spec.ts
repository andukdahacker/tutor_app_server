import { Test, TestingModule } from '@nestjs/testing';
import { LearnerProfileResolver } from './learner-profile.resolver';

describe('ProfileResolver', () => {
  let resolver: LearnerProfileResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LearnerProfileResolver],
    }).compile();

    resolver = module.get<LearnerProfileResolver>(LearnerProfileResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
