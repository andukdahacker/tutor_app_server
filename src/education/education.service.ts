import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateEducationInput } from './dto/inputs';
import { CreateEducationInput } from './dto/inputs/create-education.input';

@Injectable()
export class EducationService {
  constructor(private readonly prisma: PrismaService) {}

  async createEducation(userId: string, input: CreateEducationInput) {
    return await this.prisma.education.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        educationEntity: input.educationEntity,
        fromDate: input.fromDate,
        toDate: input.toDate,
        description: input.description,
        educationEntityUrl: input.educationEntityUrl,
      },
    });
  }

  async updateEducation(input: UpdateEducationInput) {
    return await this.prisma.education.update({
      where: {
        id: input.id,
      },
      data: {
        ...input,
      },
    });
  }

  async deleteEducation(id: string) {
    return await this.prisma.education.delete({
      where: {
        id,
      },
    });
  }
}
