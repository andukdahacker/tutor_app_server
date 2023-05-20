import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Rating } from './dto/entities/rating.entity';
import {
  CreateRatingInput,
  DeleteRatingInput,
  UpdateRatingInput,
} from './dto/inputs';
import { RatingService } from './rating.service';

@Resolver(() => Rating)
export class RatingResolver {
  constructor(private readonly ratingService: RatingService) {}

  @Mutation(() => Rating)
  async createRating(@Args('createRatingInput') input: CreateRatingInput) {
    return await this.ratingService.createRating(input);
  }

  @Mutation(() => Rating)
  async updateRating(@Args('updateRatingInput') input: UpdateRatingInput) {
    return await this.ratingService.updateRating(input);
  }

  @Mutation(() => Rating)
  async deleteRating(@Args('deleteRatingInput') input: DeleteRatingInput) {
    return await this.ratingService.deleteRating(input);
  }
}
