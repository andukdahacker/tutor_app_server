import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLearnerProfileInput } from './dto/inputs/create-learner-profile.input';
import { CreateTutorProfileInput } from './dto/inputs/create-tutor-profile.input';
import { ProfileWhereUniqueInput } from './dto/inputs/profile-where-unique.input';
import { UpdateLearnerProfileInput } from './dto/inputs/update-learner-profile-input';
import { UpdateTutorProfileInput } from './dto/inputs/update-tutor-profile-input';

@Injectable()
export class ProfileService {
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

  async createTutorProfile(input: CreateTutorProfileInput, userId: string) {
    try {
      return await this.prisma.tutorProfile.create({
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

  async updateTutorProfile(input: UpdateTutorProfileInput, userId: string) {
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

  async findLearnerProfile(input: ProfileWhereUniqueInput) {
    try {
      return await this.prisma.learnerProfile.findUnique({
        where: {
          id: input.id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
