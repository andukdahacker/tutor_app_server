import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJobInput } from './dto/inputs';
import { FindManyJobsInput } from './dto/inputs/find-many-jobs.input';

@Injectable()
export class JobService {
  constructor(private readonly prisma: PrismaService) {}

  async createTutorRequest(input: CreateJobInput) {
    return await this.prisma.job.create({
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
    return await this.prisma.job
      .findUnique({
        where: {
          id: tutorRequestId,
        },
      })
      .jobConnections();
  }

  async findManyTutorRequests(input: FindManyJobsInput) {
    const args: Prisma.JobFindManyArgs = {
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

    return await this.prisma.job.findMany(args);
  }
}
