import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { ConnectionStatus } from '@prisma/client';
import { TutorRequestConnectionWhereUniqueInput } from './dto/inputs';
import { CreateTutorRequestConnectInput } from './dto/inputs/create-tutor-request-connection.input';

@Injectable()
export class ConnectionService {
  constructor(private readonly prisma: PrismaService) {}

  async createTutorRequestConnection(input: CreateTutorRequestConnectInput) {
    return await this.prisma.tutorRequestConnection.create({
      data: {
        tutorRequest: {
          connect: {
            id: input.tutorRequestId,
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

  async acceptTutorRequestConnection(
    input: TutorRequestConnectionWhereUniqueInput,
  ) {
    try {
      return await this.prisma.tutorRequestConnection.update({
        where: {
          tutorRequestId_tutorId: {
            tutorId: input.tutorId,
            tutorRequestId: input.tutorRequestId,
          },
        },
        data: {
          status: ConnectionStatus.ACCEPTED,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async declineTutorRequestConnection(
    input: TutorRequestConnectionWhereUniqueInput,
  ) {
    try {
      return await this.prisma.tutorRequestConnection.update({
        where: {
          tutorRequestId_tutorId: {
            tutorId: input.tutorId,
            tutorRequestId: input.tutorRequestId,
          },
        },
        data: {
          status: ConnectionStatus.DECLINED,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
