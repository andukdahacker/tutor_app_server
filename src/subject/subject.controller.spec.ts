import { Test, TestingModule } from '@nestjs/testing';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';

describe('SubjectController', () => {
  let resolver: SubjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubjectController, SubjectService],
    }).compile();

    resolver = module.get<SubjectController>(SubjectController);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
