import { Test, TestingModule } from '@nestjs/testing';
import { JobController } from './job.controller';
import { JobService } from './job.service';

describe('JobResolver', () => {
  let resolver: JobController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobController, JobService],
    }).compile();

    resolver = module.get<JobController>(JobController);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
