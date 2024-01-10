import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLearnerProfileInput } from './dto/inputs/create-learner-profile.input';
import { UpdateLearnerProfileInput } from './dto/inputs/update-learner-profile-input';

@Injectable()
export class LearnerProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async createLearnerProfile(input: CreateLearnerProfileInput, userId: string) {
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
  }

  async updateLearnerProfile(input: UpdateLearnerProfileInput, userId: string) {
    return await this.prisma.learnerProfile.update({
      where: {
        userId,
      },
      data: {
        bio: input.bio,
      },
    });
  }

  async findLearnerProfileByUserId(userId: string) {
    return await this.prisma.learnerProfile.findUnique({
      where: {
        userId,
      },
      include: {
        jobs: {
          take: 10,
          include: {
            subject: true,
          },
        },
      },
    });
  }
}
