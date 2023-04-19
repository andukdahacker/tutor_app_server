import { Test, TestingModule } from '@nestjs/testing';
import { TutorRequestService } from './tutor-request.service';

describe('TutorRequestService', () => {
  let service: TutorRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TutorRequestService],
    }).compile();

    service = module.get<TutorRequestService>(TutorRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
