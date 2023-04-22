import { Test, TestingModule } from '@nestjs/testing';
import { TutorProfileService } from './tutor-profile.service';

describe('TutorProfileService', () => {
  let service: TutorProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TutorProfileService],
    }).compile();

    service = module.get<TutorProfileService>(TutorProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
