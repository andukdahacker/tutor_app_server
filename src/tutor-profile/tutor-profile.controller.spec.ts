import { Test, TestingModule } from '@nestjs/testing';
import { TutorProfileController } from './tutor-profile.controller';
import { TutorProfileService } from './tutor-profile.service';

describe('TutorProfileController', () => {
  let resolver: TutorProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TutorProfileController, TutorProfileService],
    }).compile();

    resolver = module.get<TutorProfileController>(TutorProfileController);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
