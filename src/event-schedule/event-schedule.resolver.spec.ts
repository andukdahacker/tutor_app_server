import { Test, TestingModule } from '@nestjs/testing';
import { EventScheduleResolver } from './event-schedule.resolver';
import { EventScheduleService } from './event-schedule.service';

describe('EventScheduleResolver', () => {
  let resolver: EventScheduleResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventScheduleResolver, EventScheduleService],
    }).compile();

    resolver = module.get<EventScheduleResolver>(EventScheduleResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
