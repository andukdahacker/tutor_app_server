import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateWorkExperienceInput,
  UpdateWorkExperienceInput,
} from './dto/inputs';

@Injectable()
export class WorkExperienceService {
  constructor(private readonly prisma: PrismaService) {}

  async createWorkExperience(userId: string, input: CreateWorkExperienceInput) {
    return await this.prisma.workExperience.create({
      data: {
        user: {
          connect: { id: userId },
        },
        ...input,
      },
    });
  }

  async updateWorkExperience(input: UpdateWorkExperienceInput) {
    return await this.prisma.workExperience.update({
      where: {
        id: input.workExperienceId,
      },
      data: {
        ...input,
      },
    });
  }

  async deleteWorkExperience(id: string) {
    return await this.prisma.workExperience.delete({
      where: {
        id,
      },
    });
  }
}
