import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AcceptUserEventInput,
  CreateUserEventInput,
  UpdateUserEventInput,
} from './dto/inputs';

@Injectable()
export class UserEventService {
  constructor(private readonly prisma: PrismaService) {}

  async createUserEvent(input: CreateUserEventInput) {
    return await this.prisma.userEvent.create({
      data: {
        startTime: input.startTime,
        endTime: input.endTime,
        userEventStatus: 'REQUESTED',
        job: {
          connect: {
            id: input.jobId,
          },
        },
      },
    });
  }

  async acceptUserEvent(input: AcceptUserEventInput) {
    const deleteOtherEvents = this.prisma.userEvent.deleteMany({
      where: {
        jobId: input.jobId,
      },
    });

    const updateUserEvent = this.prisma.userEvent.update({
      where: {
        id: input.userEventId,
      },
      data: {
        userEventStatus: 'ACCEPTED',
        userEventSchedule: {
          createMany: {
            data: [
              {
                scheduleId: input.myScheduleId,
              },
              {
                scheduleId: input.otherScheduleId,
              },
            ],
          },
        },
      },
    });

    const result = await this.prisma.$transaction([
      deleteOtherEvents,
      updateUserEvent,
    ]);

    return result[1];
  }

  async updateUserEvent(input: UpdateUserEventInput) {
    return await this.prisma.userEvent.update({
      where: {
        id: input.userEventId,
      },
      data: {
        startTime: input.startTime ?? undefined,
        endTime: input.endTime ?? undefined,
        userEventStatus: input.status ?? undefined,
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
