import { Test, TestingModule } from '@nestjs/testing';
import { TutorProfileResolver } from './tutor-profile.resolver';
import { TutorProfileService } from './tutor-profile.service';

describe('TutorProfileResolver', () => {
  let resolver: TutorProfileResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TutorProfileResolver, TutorProfileService],
    }).compile();

    resolver = module.get<TutorProfileResolver>(TutorProfileResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
