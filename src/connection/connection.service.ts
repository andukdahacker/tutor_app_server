import { Injectable } from '@nestjs/common';
import { ConnectionStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { JobConnectionEntity } from './dto/entities';
import {
  AcceptJobConnectionInput,
  CreateJobConnectInput,
  DeclineJobConnectionInput,
  JobConnectionWhereInput,
} from './dto/inputs';
import { DeleteJobConnectionInput } from './dto/inputs/delete_job_connection';
import GetAcceptedJobConnectionInput from './dto/inputs/get-accepted-job-connection';
import DisconnectJobConnectionInput from './dto/inputs/disconnect-job-connection.input';

@Injectable()
export class ConnectionService {
  constructor(private readonly prisma: PrismaService) {}

  async createJobConnection(input: CreateJobConnectInput) {
    return await this.prisma.jobConnection.upsert({
      where: {
        jobId_tutorId: {
          jobId: input.jobId,
          tutorId: input.tutorId,
        },
      },
      update: {
        status: 'REQUESTED',
      },
      create: {
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
    const removeAllOtherConnection = this.prisma.jobConnection.updateMany({
      where: {
        jobId: input.jobId,
      },
      data: {
        status: 'DECLINED',
      },
    });

    const connection = this.prisma.jobConnection.update({
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

    const result = await this.prisma.$transaction([
      removeAllOtherConnection,
      connection,
    ]);

    return result[1];
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

  async getTutorJobConnections(input: JobConnectionWhereInput) {
    const connections = await this.prisma.jobConnection.findMany({
      where: {
        tutorId: input.tutorId,
        type: 'TUTOR_TO_JOB',
        status: input.status,
        job: {
          jobStatus: input.jobStatus ?? undefined,
        },
      },
      take: input.take,
      skip: input.stringCursor ? 1 : undefined,
      cursor: input.stringCursor
        ? {
            jobId_tutorId: {
              jobId: input.stringCursor,
              tutorId: input.tutorId,
            },
          }
        : undefined,
      include: {
        job: {
          include: {
            learner: {
              include: {
                user: true,
              },
            },
            subject: true,
          },
        },
      },
    });

    return connections.map((e) => new JobConnectionEntity(e));
  }

  async deleteJobConnection(input: DeleteJobConnectionInput) {
    const connection = await this.prisma.jobConnection.delete({
      where: {
        jobId_tutorId: {
          jobId: input.jobId,
          tutorId: input.tutorId,
        },
      },
    });

    return connection;
  }

  async getJobJobConnections(input: JobConnectionWhereInput) {
    const connections = await this.prisma.jobConnection.findMany({
      where: {
        jobId: input.jobId,
        type: 'TUTOR_TO_JOB',
        status: input.status,
      },
      take: input.take,
      skip: input.stringCursor ? 1 : undefined,
      cursor: input.stringCursor
        ? {
            jobId_tutorId: {
              jobId: input.jobId,
              tutorId: input.stringCursor,
            },
          }
        : undefined,
      include: {
        tutor: {
          include: {
            user: true,
          },
        },
      },
    });

    return connections.map((e) => new JobConnectionEntity(e));
  }

  async getAcceptedConnection(input: GetAcceptedJobConnectionInput) {
    const connection = await this.prisma.jobConnection.findFirst({
      where: {
        jobId: input.jobId,
        status: 'ACCEPTED',
      },
      include: {
        tutor: {
          include: {
            user: true,
          },
        },
      },
    });

    return connection;
  }

  async disconnectJobConnection(input: DisconnectJobConnectionInput) {
    const connection = this.prisma.jobConnection.update({
      where: {
        jobId_tutorId: {
          jobId: input.jobId,
          tutorId: input.tutorId,
        },
      },
      data: {
        status: 'DECLINED',
      },
    });

    const job = this.prisma.job.update({
      where: {
        id: input.jobId,
      },
      data: {
        jobStatus: 'OPEN',
      },
    });

    const result = await this.prisma.$transaction([connection, job]);

    return result;
  }
}
