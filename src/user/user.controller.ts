import {
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ITokenPayload } from 'src/auth/types';
import { LearnerProfileService } from 'src/learner-profile/learner-profile.service';
import { TokenPayload } from 'src/shared/decorators/current-user.decorator';
import { TutorProfileService } from 'src/tutor-profile/tutor-profile.service';
import { UserEntity } from './dto/entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly tutorProfileService: TutorProfileService,
    private readonly learnerProfileService: LearnerProfileService,
  ) {}

  @Get()
  async getUser(@Req() req): Promise<UserEntity> {
    const userId = req.user.userId;

    const user = await this.userService.findOneById(userId);

    return new UserEntity(user);
  }

  @Post('upload/avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @TokenPayload() { userId }: ITokenPayload,
  ) {
    return await this.userService.changeAvatar(file, userId);
  }
}
