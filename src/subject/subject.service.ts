import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubjectInput } from './dto/inputs/create-subject.input';

@Injectable()
export class SubjectService {
  constructor(private readonly prisma: PrismaService) {}

  async createSubject(input: CreateSubjectInput) {
    try {
      return await this.prisma.subject.create({
        data: {
          name: input.name,
          description: input.description,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
