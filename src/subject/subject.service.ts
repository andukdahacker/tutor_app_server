import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindManySubjectsInput } from './dto/inputs';
import { CreateSubjectInput } from './dto/inputs/create-subject.input';
import { SubjectWhereUniqueInput } from './dto/inputs/subject-where-unique.input';

@Injectable()
export class SubjectService {
  constructor(private readonly prisma: PrismaService) {}

  async createSubject(input: CreateSubjectInput) {
    return await this.prisma.subject.create({
      data: {
        name: input.name,
        description: input.description,
      },
    });
  }

  async findSubject(input: SubjectWhereUniqueInput) {
    return await this.prisma.subject.findUnique({
      where: {
        id: input.id,
      },
    });
  }

  async findManySubject(input: FindManySubjectsInput) {
    return await this.prisma.subject.findMany({
      where: {
        name: {
          contains: input.searchString,
          mode: 'insensitive',
        },
      },
      take: input.take ?? undefined,
      cursor: input.stringCursor
        ? {
            id: input.stringCursor,
          }
        : undefined,
      skip: input.stringCursor ? 1 : undefined,
    });
  }
}
