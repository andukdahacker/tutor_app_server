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

  async findLearnerProfile(jobId: string) {
    try {
      return await this.prisma.job
        .findUnique({
          where: {
            id: jobId,
          },
        })
        .learner();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
