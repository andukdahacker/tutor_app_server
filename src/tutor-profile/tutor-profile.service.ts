import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { TutorProfileEntity } from './dto/entities/tutor-profile.entity';
import {
  CreateTutorProfileInput,
  FindManyTutorProfilesInput,
  UpdateTutorProfileInput,
} from './dto/inputs';
import { DeleteTutorProfileSubjectInput } from './dto/inputs/delete_tutor_profile_subject.input';

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
        tutorProfileSubject: !input.subjectIds
          ? undefined
          : {
              deleteMany: {
                subjectId: {
                  in: input.subjectIds ?? [],
                },
              },
              createMany: {
                data: input.subjectIds?.map((e) => {
                  return {
                    subjectId: e,
                  };
                }),
              },
            },
        tutorFee: input.tutorFee,
        jobMethod: input.jobMethod,
      },
      include: {
        tutorProfileSubject: {
          include: {
            subject: true,
            tutor: true,
          },
        },
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

  async deleteTutotProfileSubject(input: DeleteTutorProfileSubjectInput) {
    return await this.prisma.tutorProfileSubject.delete({
      where: {
        tutorId_subjectId: {
          subjectId: input.subjectId,
          tutorId: input.tutorProfileId,
        },
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
}
