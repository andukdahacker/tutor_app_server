import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';

@Module({
  providers: [RatingService],
  controllers: [RatingController],
})
export class RatingModule {}
