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
}
