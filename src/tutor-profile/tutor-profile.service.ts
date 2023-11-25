import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { TutorProfileEntity } from './dto/entities/tutor-profile.entity';
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

  async findJobConnections(tutorProfileId: string) {
    return await this.prisma.tutorProfile
      .findUnique({
        where: {
          id: tutorProfileId,
        },
      })
      .jobConnections();
  }

  async findTutorProfileByUserId(userId: string) {
    return await this.prisma.tutorProfile.findUnique({
      where: {
        userId,
      },
    });
  }

  async findManyTutorProfiles(
    input: FindManyTutorProfilesInput,
  ): Promise<TutorProfileEntity[]> {
    const args: Prisma.TutorProfileFindManyArgs = {
      cursor: input.stringCursor
        ? {
            id: input.stringCursor,
          }
        : undefined,
      take: input.take,
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
      include: {
        user: true,
      },
    };

    const profiles = await this.prisma.tutorProfile.findMany(args);

    return profiles.map((profile) => new TutorProfileEntity(profile));
  }

  async findJobConnectionsByTutorIds(ids: string[]) {
    const profiles = await this.prisma.tutorProfile.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        jobConnections: true,
      },
    });

    const mappedResult = ids.map(
      (id) => profiles.find((profile) => profile.id == id).jobConnections,
    );

    return mappedResult;
  }

  async findUsersByTutorIds(ids: string[]) {
    const users = await this.prisma.user.findMany({
      where: {
        tutorProfile: {
          id: {
            in: ids,
          },
        },
      },
      include: {
        tutorProfile: true,
      },
    });

    const mappedResult = ids.map((id) =>
      users.find((user) => user.tutorProfile.id == id),
    );

    return mappedResult;
  }

  async findSubjectsByTutorIds(ids: string[]) {
    const profiles = await this.prisma.tutorProfile.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        tutorProfileSubject: true,
      },
    });

    const mappedResult = ids.map(
      (id) => profiles.find((profile) => profile.id == id).tutorProfileSubject,
    );

    return mappedResult;
  }
}
