import { Test, TestingModule } from '@nestjs/testing';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';

describe('RatingController', () => {
  let resolver: RatingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RatingController, RatingService],
    }).compile();

    resolver = module.get<RatingController>(RatingController);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
