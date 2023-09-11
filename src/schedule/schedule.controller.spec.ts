import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleResolver } from './schedule.controller';
import { ScheduleService } from './schedule.service';

describe('ScheduleController', () => {
  let resolver: ScheduleResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduleResolver, ScheduleService],
    }).compile();

    resolver = module.get<ScheduleResolver>(ScheduleResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
