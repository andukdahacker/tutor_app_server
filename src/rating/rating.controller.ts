import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import {
  CreateRatingInput,
  DeleteRatingInput,
  UpdateRatingInput,
} from './dto/inputs';
import { RatingService } from './rating.service';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RatingEntity } from './dto/entities/rating.entity';
import { ErrorResponse } from 'src/shared/types/error_response';

@ApiTags('Rating')
@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  @ApiOkResponse({type: RatingEntity})
  @ApiInternalServerErrorResponse({type: ErrorResponse})
  @ApiUnauthorizedResponse({type: ErrorResponse})
  async createRating(@Body() input: CreateRatingInput) {
    return await this.ratingService.createRating(input);
  }

  @Put()
  @ApiOkResponse({type: RatingEntity})
  @ApiInternalServerErrorResponse({type: ErrorResponse})
  @ApiUnauthorizedResponse({type: ErrorResponse})
  async updateRating(@Body() input: UpdateRatingInput) {
    return await this.ratingService.updateRating(input);
  }

  @Delete()
  @ApiOkResponse({type: RatingEntity})
  @ApiInternalServerErrorResponse({type: ErrorResponse})
  @ApiUnauthorizedResponse({type: ErrorResponse})
  async deleteRating(@Body() input: DeleteRatingInput) {
    return await this.ratingService.deleteRating(input);
  }
}
