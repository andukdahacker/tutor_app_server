import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTutorRequestInput } from './dto/inputs';
import { FindManyTutorRequestsInput } from './dto/inputs/find-tutor-request.input';

@Injectable()
export class TutorRequestService {
  constructor(private readonly prisma: PrismaService) {}

  async createTutorRequest(input: CreateTutorRequestInput) {
    return await this.prisma.tutorRequest.create({
      data: {
        learner: {
          connect: {
            id: input.learnerId,
          },
        },
        subject: {
          connect: {
            id: input.subjectId,
          },
        },
        description: input.description,
      },
    });
  }

  async findTutorRequestConnections(tutorRequestId: string) {
    return await this.prisma.tutorRequest
      .findUnique({
        where: {
          id: tutorRequestId,
        },
      })
      .tutorRequestConnections();
  }

  async findManyTutorRequests(input: FindManyTutorRequestsInput) {
    const args: Prisma.TutorRequestFindManyArgs = {
      take: input.take,
      cursor: input.stringCursor
        ? {
            id: input.stringCursor,
          }
        : undefined,
      skip: input.stringCursor ? 1 : undefined,
      where: {
        OR: [
          {
            learner: {
              user: {
                username: {
                  contains: input.searchString,
                  mode: 'insensitive',
                },
              },
            },
          },
          {
            subject: {
              name: {
                contains: input.searchString,
                mode: 'insensitive',
              },
            },
          },
        ],
      },
    };

    return await this.prisma.tutorRequest.findMany(args);
  }
}
