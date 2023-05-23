import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TutorProfileSubjectService {
  constructor(private readonly prisma: PrismaService) {}

  async findTutor(id: string) {
    return await this.prisma.tutorProfile.findUnique({
      where: {
        id,
      },
    });
  }

  async findSubject(id: string) {
    return await this.prisma.subject.findUnique({
      where: {
        id,
      },
    });
  }

  async findSubjectByTutorIds(ids: string[]) {
    const tutorProfileSubject = await this.prisma.tutorProfileSubject.findMany({
      where: {
        tutorId: {
          in: ids,
        },
      },
      include: {
        subject: true,
      },
    });

    const mappedResult = ids.map(
      (id) => tutorProfileSubject.find((e) => e.tutorId == id).subject,
    );

    return mappedResult;
  }
}
