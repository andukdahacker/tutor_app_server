import { Test, TestingModule } from '@nestjs/testing';
import { EducationResolver } from './education.resolver';
import { EducationService } from './education.service';

describe('EducationResolver', () => {
  let resolver: EducationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EducationResolver, EducationService],
    }).compile();

    resolver = module.get<EducationResolver>(EducationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
