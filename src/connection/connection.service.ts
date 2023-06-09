import { Injectable } from '@nestjs/common';
import { ConnectionStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AcceptJobConnectionInput,
  CreateJobConnectInput,
  DeclineJobConnectionInput,
  JobConnectionWhereInput,
} from './dto/inputs';

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

  async getJobConnections(input: JobConnectionWhereInput) {
    return await this.prisma.jobConnection.findMany({
      where: {
        tutorId: input.tutorId,
        type: input.type,
        status: input.status,
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
