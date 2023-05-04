import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateTutorProfileInput,
  FindManyTutorProfilesInput,
  UpdateTutorProfileInput,
} from './dto/inputs';

@Injectable()
export class TutorProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async createTutorProfile(input: CreateTutorProfileInput, userId: string) {
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
  }

  async updateTutorProfile(input: UpdateTutorProfileInput, userId: string) {
    return await this.prisma.tutorProfile.update({
      where: {
        userId,
      },
      data: {
        bio: input.bio,
      },
    });
  }

  async findUser(tutorProfileId: string) {
    return await this.prisma.tutorProfile
      .findUnique({
        where: {
          id: tutorProfileId,
        },
      })
      .user();
  }

  async findSubject(tutorProfileId: string) {
    return await this.prisma.subject.findMany({
      where: {
        tutorProfileSubject: {
          some: {
            tutorId: tutorProfileId,
          },
        },
      },
    });
  }

  async findTutorRequestConnections(tutorProfileId: string) {
    return await this.prisma.tutorProfile
      .findUnique({
        where: {
          id: tutorProfileId,
        },
      })
      .jobConnections();
  }

  async findManyTutorProfiles(input: FindManyTutorProfilesInput) {
    const args: Prisma.TutorProfileFindManyArgs = {
      cursor: input.stringCursor
        ? {
            id: input.stringCursor,
          }
        : undefined,
      take: input.take ?? undefined,
      skip: input.stringCursor ? 1 : undefined,
      where: {
        OR: [
          {
            tutorProfileSubject: {
              some: {
                subject: {
                  name: {
                    contains: input.searchString,
                    mode: 'insensitive',
                  },
                },
              },
            },
          },
          {
            user: {
              username: {
                contains: input.searchString,
                mode: 'insensitive',
              },
            },
          },
        ],
      },
    };

    return await this.prisma.tutorProfile.findMany(args);
  }
}
