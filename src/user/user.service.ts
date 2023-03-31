import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/inputs/create-user.input';

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
    return await this.prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
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
