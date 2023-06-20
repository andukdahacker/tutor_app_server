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
    return await this.prisma.tutorProfile.update({
      where: {
        userId,
      },
      data: {
        bio: input.bio,
      },
    });
  }

  async findLearnerProfile(jobId: string) {
    return await this.prisma.job
      .findUnique({
        where: {
          id: jobId,
        },
      })
      .learner();
  }

  async getUserByLearnerIds(ids: string[]) {
    const profiles = await this.prisma.learnerProfile.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        user: true,
      },
    });

    const mappedResult = ids.map(
      (id) => profiles.find((profile) => profile.id == id).user,
    );

    return mappedResult;
  }
}
