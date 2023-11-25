import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

import { JobEntity } from './dto/entities';
import { CreateJobInput } from './dto/inputs';
import { FindManyJobsInput } from './dto/inputs/find-many-jobs.input';

@Injectable()
export class JobService {
  constructor(private readonly prisma: PrismaService) {}

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
            tutorId: input.tutorId,
          },
        },
      },
    };

    const jobs = await this.prisma.job.findMany(args);

    return jobs.map((job) => new JobEntity(job));
  }

  async findLearnerByJobIds(ids: string[]) {
    const jobs = await this.prisma.job.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        learner: true,
      },
    });

    const mappedResult = ids.map(
      (id) => jobs.find((job) => job.id == id).learner,
    );

    return mappedResult;
  }

  async findSubjectByJobIds(ids: string[]) {
    const jobs = await this.prisma.job.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        subject: true,
      },
    });

    const mappedResult = ids.map(
      (id) => jobs.find((job) => job.id == id).subject,
    );

    return mappedResult;
  }

  async findConnectionsByJobIds(ids: string[]) {
    const jobs = await this.prisma.job.findMany({
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
      (id) => jobs.find((job) => job.id == id).jobConnections,
    );

    return mappedResult;
  }
}
