import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JobConnection, TutorProfileSubject } from '@prisma/client';
import DataLoader from 'dataloader';
import { LearnerProfile } from 'src/learner-profile/dto/entities';
import { PrismaService } from 'src/prisma/prisma.service';
import { Subject } from 'src/subject/dto/entities';
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

  async findJobConnectionByBatch(ids: string[]) {
    try {
      const connections = await Promise.all(
        ids.map((id) =>
          this.prisma.tutorProfile
            .findUnique({
              where: {
                id,
              },
            })
            .jobConnections(),
        ),
      );

      const mappedResult = ids.map((id) =>
        connections.find((connection) =>
          connection.find((e) => e.tutorId === id),
        ),
      );

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

  async batchLearnerProfileByJob(ids: string[]) {
    try {
      const profiles = await this.prisma.learnerProfile.findMany({
        where: {
          id: {
            in: ids,
          },
        },
      });

      const mappedResult = ids.map((id) =>
        profiles.find((profile) => profile.id === id),
      );

      return mappedResult;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async batchSubjectByJob(ids: string[]) {
    try {
      const subjects = await this.prisma.subject.findMany({
        where: {
          id: {
            in: ids,
          },
        },
      });

      const mappedResult = this.mapFn(ids, subjects, 'id');

      return mappedResult;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async batchConnectionByJob(ids: string[]) {
    try {
      const connections = await Promise.all(
        ids.map((id) => {
          return this.prisma.job
            .findUnique({
              where: {
                id,
              },
            })
            .jobConnections();
        }),
      );

      const mappedResult = ids.map((id) =>
        connections.find((connection) =>
          connection.find((e) => e.jobId === id),
        ),
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

    const connectionsByTutorIdLoader = new DataLoader<string, JobConnection[]>(
      async (keys: string[]) =>
        await this.findJobConnectionByBatch(keys as string[]),
    );

    const tutorProfileSubjectByTutorIdLoader = new DataLoader<
      string,
      TutorProfileSubject
    >(
      async (keys: string[]) =>
        await this.batchSubjectsByTutorId(keys as string[]),
    );

    const leanerProfileByJobLoader = new DataLoader<string, LearnerProfile>(
      async (keys: string[]) =>
        await this.batchLearnerProfileByJob(keys as string[]),
    );

    const subjectByJobLoader = new DataLoader<string, Subject>(
      async (keys: string[]) => await this.batchSubjectByJob(keys as string[]),
    );

    const connectionsByJobLoader = new DataLoader<string, JobConnection[]>(
      async (keys: string[]) => {
        const result = await this.batchConnectionByJob(keys as string[]);

        return result;
      },
    );

    return {
      usersLoader,
      connectionsByTutorIdLoader,
      tutorProfileSubjectByTutorIdLoader,
      leanerProfileByJobLoader: leanerProfileByJobLoader,
      subjectByJobLoader: subjectByJobLoader,
      connectionsByJobLoader: connectionsByJobLoader,
    };
  }
}
