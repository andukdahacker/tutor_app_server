import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import {
  CreateRatingInput,
  DeleteRatingInput,
  UpdateRatingInput,
} from './dto/inputs';
import { RatingService } from './rating.service';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  async createRating(@Body() input: CreateRatingInput) {
    return await this.ratingService.createRating(input);
  }

  @Put()
  async updateRating(@Body() input: UpdateRatingInput) {
    return await this.ratingService.updateRating(input);
  }

  @Delete()
  async deleteRating(@Body() input: DeleteRatingInput) {
    return await this.ratingService.deleteRating(input);
  }
}
