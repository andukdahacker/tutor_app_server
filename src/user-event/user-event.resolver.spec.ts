import { Test, TestingModule } from '@nestjs/testing';
import { UserEventResolver } from './user-event.resolver';
import { UserEventService } from './user-event.service';

describe('UserEventResolver', () => {
  let resolver: UserEventResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserEventResolver, UserEventService],
    }).compile();

    resolver = module.get<UserEventResolver>(UserEventResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
