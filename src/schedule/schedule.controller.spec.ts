import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';

describe('ScheduleController', () => {
  let resolver: ScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduleController, ScheduleService],
    }).compile();

    resolver = module.get<ScheduleController>(ScheduleController);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
