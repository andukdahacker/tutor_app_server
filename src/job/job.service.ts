import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

import { JobEntity } from './dto/entities';
import { CreateJobInput } from './dto/inputs';
import FindJobByLearnerInput from './dto/inputs/find-jobs-by-learner.input';
import { FindManyJobsInput } from './dto/inputs/find-many-jobs.input';
import { UpdateJobInput } from './dto/inputs/update-job-input';

@Injectable()
export class JobService {
  constructor(private readonly prisma: PrismaService) {}

  async findJobById(jobId: string) {
    const job = await this.prisma.job.findUniqueOrThrow({
      where: {
        id: jobId,
      },
      include: {
        subject: true,
      },
    });

    return job;
  }

  async createJob(input: CreateJobInput, userId: string) {
    const learner = await this.prisma.learnerProfile.findUniqueOrThrow({
      where: {
        userId,
      },
    });

    return await this.prisma.job.create({
      data: {
        learner: {
          connect: {
            id: learner.id,
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
        numberOfSessions: input.numberOfSessions,
      },
      include: {
        learner: {
          include: {
            user: true,
          },
        },
        subject: true,
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

  async findManyJobs(input: FindManyJobsInput, userId: string) {
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
        fee: {
          lte: input.maxFee,
          gte: input.minFee,
        },
        jobType: input.jobType,
        jobMethod: input.jobMethod,
      },
      orderBy: {
        createdAt: input.sortBy,
      },
      include: {
        subject: true,
        learner: {
          include: {
            user: true,
          },
        },
        jobConnections: {
          where: {
            tutor: {
              userId,
            },
          },
        },
      },
    };

    const jobs = await this.prisma.job.findMany(args);

    return jobs.map((job) => new JobEntity(job));
  }

  async findJobsByLearnerId(input: FindJobByLearnerInput, userId: string) {
    const jobs = await this.prisma.job.findMany({
      where: {
        learner: {
          userId,
        },
      },
      skip: input.stringCursor ? 1 : undefined,
      take: input.take,
      cursor: input.stringCursor
        ? {
            id: input.stringCursor,
          }
        : undefined,
      include: {
        subject: true,
        jobConnections: true,
      },
    });

    return jobs.map((e) => new JobEntity(e));
  }

  async updateJob(input: UpdateJobInput) {
    const job = await this.prisma.job.update({
      where: {
        id: input.id,
      },
      data: {
        description: input.description,
        fee: input.fee,
        jobMethod: input.jobMethod,
        jobStatus: input.jobStatus,
        jobType: input.jobType,
        title: input.title,
        numberOfSessions: input.numberOfSessions,
        subject: input.subjectId
          ? {
              connect: {
                id: input.subjectId,
              },
            }
          : undefined,
      },
    });

    return job;
  }
}
