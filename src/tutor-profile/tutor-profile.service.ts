import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTutorProfileInput, UpdateTutorProfileInput } from './dto/inputs';

@Injectable()
export class TutorProfileService {
  constructor(private readonly prisma: PrismaService) {}

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

  async findUser(tutorProfileId: string) {
    try {
      return await this.prisma.tutorProfile
        .findUnique({
          where: {
            id: tutorProfileId,
          },
        })
        .user();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findSubject(tutorProfileId: string) {
    try {
      return await this.prisma.subject.findMany({
        where: {
          tutorProfileSubject: {
            some: {
              tutorId: tutorProfileId,
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findTutorRequestConnections(tutorProfileId: string) {
    try {
      return await this.prisma.tutorProfile
        .findUnique({
          where: {
            id: tutorProfileId,
          },
        })
        .tutorRequestConnections();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findManyTutorProfiles(input: string) {
    try {
      return await this.prisma.tutorProfile.findMany({
        where: {
          OR: [
            {
              tutorProfileSubject: {
                some: {
                  subject: {
                    name: {
                      contains: input,
                      mode: 'insensitive',
                    },
                  },
                },
              },
            },
            {
              user: {
                username: {
                  contains: input,
                  mode: 'insensitive',
                },
              },
            },
          ],
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
