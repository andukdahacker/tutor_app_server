import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/inputs/create-user.input';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async createOne({ username, password, email }: CreateUserInput) {
    try {
      return await this.prisma.user.create({
        data: {
          username,
          email,
          password,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOneByEmail(email: string) {
    try {
      return await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
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
    try {
      return await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          refreshToken,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async removeUserRefreshToken(id: string) {
    try {
      return await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          refreshToken: null,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOneByRefreshToken(refreshToken: string) {
    try {
      return await this.prisma.user.findUnique({
        where: {
          refreshToken,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
