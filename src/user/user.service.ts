import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/inputs';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileUploadService,
  ) {}
  async createOne({ username, password, email }: CreateUserInput) {
    return await this.prisma.user.create({
      data: {
        username,
        email,
        password,
        learnerProfile: {
          create: {
            bio: '',
          },
        },
        tutorProfile: {
          create: {
            bio: '',
          },
        },
      },
    });
  }

  async findOneByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        learnerProfile: true,
        tutorProfile: true,
      },
    });
  }

  async findOneById(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        learnerProfile: {
          include: {
            jobs: {
              take: 5,
              include: {
                subject: true,
              },
            },
          },
        },
        tutorProfile: true,
      },
    });
  }

  async changeAvatar(file: Express.Multer.File, userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user.avatar) {
      const deleteS3Object = await this.fileService.delete(user.avatar);

      if (!deleteS3Object) throw new InternalServerErrorException();
    }

    const uploadFile = await this.fileService.upload(file);

    if (!uploadFile) throw new InternalServerErrorException();

    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        avatar: uploadFile,
      },
    });
  }
}
