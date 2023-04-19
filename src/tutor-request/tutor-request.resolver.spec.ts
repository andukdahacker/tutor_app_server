import { Test, TestingModule } from '@nestjs/testing';
import { TutorRequestResolver } from './tutor-request.resolver';
import { TutorRequestService } from './tutor-request.service';

describe('TutorRequestResolver', () => {
  let resolver: TutorRequestResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TutorRequestResolver, TutorRequestService],
    }).compile();

    resolver = module.get<TutorRequestResolver>(TutorRequestResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
