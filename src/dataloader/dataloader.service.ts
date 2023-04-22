import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { TutorProfileSubject, TutorRequestConnection } from '@prisma/client';
import DataLoader from 'dataloader';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/dto/entities';
import { IDataloader } from './types/IDataloader';

@Injectable()
export class DataloaderService {
  constructor(private readonly prisma: PrismaService) {}

  mapFn<I extends Array<string | number>, T>(
    ids: I,
    objects: Array<T>,
    objectKey: string,
  ): T[] {
    return ids.map((id) => objects.find((object) => object[objectKey] === id));
  }

  async findUsersByBatch(userIds: string[]) {
    try {
      const users = await this.prisma.user.findMany({
        where: {
          id: {
            in: userIds,
          },
        },
      });

      const mappedResult = this.mapFn(userIds, users, 'id');

      return mappedResult;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findTutorRequestConnectionByBatch(ids: string[]) {
    try {
      const connections = await this.prisma.tutorRequestConnection.findMany({
        where: {
          tutorId: {
            in: ids,
          },
        },
      });

      const mappedResult = ids.map((id) => {
        return connections.find((e) => e.tutorId === id);
      });

      return mappedResult;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async batchSubjectsByTutorId(ids: string[]) {
    try {
      const subjects = await this.prisma.tutorProfileSubject.findMany({
        where: {
          tutorId: {
            in: ids,
          },
        },
      });

      const mappedResult = ids.map((id) =>
        subjects.find((s) => s.tutorId === id),
      );

      return mappedResult;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  createLoader(): IDataloader {
    const usersLoader = new DataLoader<string, User>(
      async (keys: string[]) => await this.findUsersByBatch(keys as string[]),
    );

    const connectionsByTutorIdLoader = new DataLoader<
      string,
      TutorRequestConnection
    >(
      async (keys: string[]) =>
        await this.findTutorRequestConnectionByBatch(keys as string[]),
    );

    const tutorProfileSubjectByTutorIdLoader = new DataLoader<
      string,
      TutorProfileSubject
    >(
      async (keys: string[]) =>
        await this.batchSubjectsByTutorId(keys as string[]),
    );

    return {
      usersLoader,
      connectionsByTutorIdLoader,
      tutorProfileSubjectByTutorIdLoader,
    };
  }
}
