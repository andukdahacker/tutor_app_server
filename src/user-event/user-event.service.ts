import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserEventInput, UpdateUserEventInput } from './dto/inputs';

@Injectable()
export class UserEventService {
  constructor(private readonly prisma: PrismaService) {}

  async createUserEvent(input: CreateUserEventInput) {
    return await this.prisma.userEvent.create({
      data: {
        startTime: input.startTime,
        endTime: input.endTime,
        userEventType: input.type,
        job: {
          connect: {
            id: input.jobId,
          },
        },
      },
    });
  }

  async updateUserEvent(input: UpdateUserEventInput) {
    return await this.prisma.userEvent.update({
      where: {
        id: input.userEventId,
      },
      data: {
        startTime: input.startTime ?? undefined,
        userEventType: input.type ?? undefined,
        endTime: input.endTime ?? undefined,
      },
    });
  }

  async getJobsByUserEventIds(ids: string[]) {
    const userEvents = await this.prisma.userEvent.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        job: true,
      },
    });

    const mappedResult = ids.map(
      (id) => userEvents.find((userEvent) => userEvent.id == id).job,
    );

    return mappedResult;
  }
}
