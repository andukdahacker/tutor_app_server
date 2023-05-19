import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateJobInput } from './dto/inputs';
import { FindManyJobsInput } from './dto/inputs/find-many-jobs.input';

@Injectable()
export class JobService {
  constructor(private readonly prisma: PrismaService) {}

  async createJob(input: CreateJobInput) {
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
        fee: input.fee,
        title: input.title,
        jobType: input.jobType,
        jobMethod: input.jobMethod,
        description: input.description,
      },
    });
  }

  async findJobConnections(jobId: string) {
    return await this.prisma.job
      .findUnique({
        where: {
          id: jobId,
        },
      })
      .jobConnections();
  }

  async findManyJobs(input: FindManyJobsInput) {
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
        fee: input.fee,
        jobType: input.jobType,
        jobMethod: input.jobMethod,
      },
      orderBy: {
        createdAt: input.sortOrder,
      },
    };

    return await this.prisma.job.findMany(args);
  }
}
