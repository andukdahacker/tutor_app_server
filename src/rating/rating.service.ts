import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateRatingInput,
  DeleteRatingInput,
  UpdateRatingInput,
} from './dto/inputs';

@Injectable()
export class RatingService {
  constructor(private readonly prisma: PrismaService) {}

  async createRating(input: CreateRatingInput) {
    return await this.prisma.rating.create({
      data: {
        rater: {
          connect: {
            id: input.raterId,
          },
        },
        rated: {
          connect: {
            id: input.ratedId,
          },
        },
        score: input.score,
        comment: input.comment,
        job: {
          connect: {
            id: input.jobId,
          },
        },
      },
    });
  }

  async updateRating(input: UpdateRatingInput) {
    return await this.prisma.rating.update({
      where: {
        ratedId_raterId_jobId: {
          jobId: input.jobId,
          ratedId: input.ratedId,
          raterId: input.raterId,
        },
      },
      data: {
        comment: input.comment,
        score: input.score,
      },
    });
  }

  async deleteRating(input: DeleteRatingInput) {
    return await this.prisma.rating.delete({
      where: {
        ratedId_raterId_jobId: {
          jobId: input.jobId,
          ratedId: input.ratedId,
          raterId: input.raterId,
        },
      },
    });
  }
}
