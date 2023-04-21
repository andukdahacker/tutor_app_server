import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubjectInput } from './dto/inputs/create-subject.input';
import { SubjectWhereUniqueInput } from './dto/inputs/subject-where-unique.input';

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

  async findSubject(input: SubjectWhereUniqueInput) {
    try {
      return await this.prisma.subject.findUnique({
        where: {
          id: input.id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
