import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTutorRequestInput } from './dto/inputs';

@Injectable()
export class TutorRequestService {
  constructor(private readonly prisma: PrismaService) {}

  async createTutorRequest(input: CreateTutorRequestInput) {
    try {
      return await this.prisma.tutorRequest.create({
        data: {
          learner: {
            connect: {
              id: input.learnerId,
            },
          },
          subject: {
            connect: {
              id: input.subjectId,
            },
          },
          description: input.description,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findTutorRequestConnections(tutorRequestId: string) {
    try {
      return await this.prisma.tutorRequest
        .findUnique({
          where: {
            id: tutorRequestId,
          },
        })
        .tutorRequestConnections();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findManyTutorRequests(searchString: string) {
    try {
      return await this.prisma.tutorRequest.findMany({
        where: {
          OR: [
            {
              learner: {
                user: {
                  username: {
                    contains: searchString,
                    mode: 'insensitive',
                  },
                },
              },
            },
            {
              subject: {
                name: {
                  contains: searchString,
                  mode: 'insensitive',
                },
              },
            },
          ],
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
