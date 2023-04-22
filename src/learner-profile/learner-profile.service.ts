import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLearnerProfileInput } from './dto/inputs/create-learner-profile.input';
import { UpdateLearnerProfileInput } from './dto/inputs/update-learner-profile-input';

@Injectable()
export class LearnerProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async createLearnerProfile(input: CreateLearnerProfileInput, userId: string) {
    try {
      return await this.prisma.learnerProfile.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          bio: input.bio,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateLearnerProfile(input: UpdateLearnerProfileInput, userId: string) {
    try {
      return await this.prisma.tutorProfile.update({
        where: {
          userId,
        },
        data: {
          bio: input.bio,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findLearnerProfile(tutorRequestId: string) {
    try {
      return await this.prisma.tutorRequest
        .findUnique({
          where: {
            id: tutorRequestId,
          },
        })
        .learner();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findLearnersByBatch(learnerIds: string[]) {
    try {
      const result = await this.prisma.learnerProfile.findMany({
        where: {
          id: {
            in: learnerIds,
          },
        },
      });

      const mappedResult = learnerIds.map(
        (id) =>
          result.find((result) => result.id === id) ||
          new InternalServerErrorException(),
      );

      return mappedResult;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
