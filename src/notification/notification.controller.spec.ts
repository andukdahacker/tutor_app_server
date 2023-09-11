import { Test, TestingModule } from '@nestjs/testing';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

describe('NotificationResolver', () => {
  let resolver: NotificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationController, NotificationService],
    }).compile();

    resolver = module.get<NotificationController>(NotificationController);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
