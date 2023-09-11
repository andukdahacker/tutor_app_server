import { Test, TestingModule } from '@nestjs/testing';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';

describe('EducationResolver', () => {
  let resolver: EducationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EducationController, EducationService],
    }).compile();

    resolver = module.get<EducationController>(EducationController);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
