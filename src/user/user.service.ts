import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/inputs';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async createOne({ username, password, email }: CreateUserInput) {
    return await this.prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
  }

  async findOneByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findOneById(id: string) {
    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async upsertRefreshToken(id: string, refreshToken: string) {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        refreshToken,
      },
    });
  }

  async removeUserRefreshToken(id: string) {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        refreshToken: null,
      },
    });
  }

  async findOneByRefreshToken(refreshToken: string) {
    return await this.prisma.user.findUnique({
      where: {
        refreshToken,
      },
    });
  }
}
