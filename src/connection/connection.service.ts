import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { ConnectionStatus } from '@prisma/client';
import { GetRequestedJobForTutorInput } from './dto/inputs';
import { AcceptJobConnectionInput } from './dto/inputs/accept-job-connection.input';
import { CreateJobConnectInput } from './dto/inputs/create-job-connection.input';
import { DeclineJobConnectionInput } from './dto/inputs/decline-job-connection.input';

@Injectable()
export class ConnectionService {
  constructor(private readonly prisma: PrismaService) {}

  async createJobConnection(input: CreateJobConnectInput) {
    return await this.prisma.jobConnection.create({
      data: {
        job: {
          connect: {
            id: input.jobId,
          },
        },
        tutor: {
          connect: {
            id: input.tutorId,
          },
        },
        status: ConnectionStatus.REQUESTED,
        type: input.type,
      },
    });
  }

  async acceptJobConnection(input: AcceptJobConnectionInput) {
    return await this.prisma.jobConnection.update({
      where: {
        jobId_tutorId: {
          tutorId: input.tutorId,
          jobId: input.jobId,
        },
      },
      data: {
        status: ConnectionStatus.ACCEPTED,
      },
    });
  }

  async declineJobConnection(input: DeclineJobConnectionInput) {
    return await this.prisma.jobConnection.update({
      where: {
        jobId_tutorId: {
          tutorId: input.tutorId,
          jobId: input.jobId,
        },
      },
      data: {
        status: ConnectionStatus.DECLINED,
      },
    });
  }

  async getTutorJobConnections(input: GetRequestedJobForTutorInput) {
    return await this.prisma.jobConnection.findMany({
      where: {
        tutorId: input.tutorId,
        type: 'JOB_TO_TUTOR',
        status: 'REQUESTED',
      },
      take: input.take,
      cursor: {
        jobId_tutorId: {
          jobId: input.stringCursor,
          tutorId: input.tutorId,
        },
      },
    });
  }
}
