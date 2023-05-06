import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { ConnectionStatus } from '@prisma/client';
import { AcceptJobConnectionInput } from './dto/inputs/accept-job-connection.input';
import { CreateJobConnectInput } from './dto/inputs/create-job-connection.input';
import { DeclineJobConnectionInput } from './dto/inputs/decline-job-connection.input';

@Injectable()
export class ConnectionService {
  constructor(private readonly prisma: PrismaService) {}

  async createTutorRequestConnection(input: CreateJobConnectInput) {
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

  async acceptTutorRequestConnection(input: AcceptJobConnectionInput) {
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

  async declineTutorRequestConnection(input: DeclineJobConnectionInput) {
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
}
