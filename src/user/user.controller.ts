import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ITokenPayload } from 'src/auth/types';
import { LearnerProfileService } from 'src/learner-profile/learner-profile.service';
import { TokenPayload } from 'src/shared/decorators/current-user.decorator';
import { TutorProfileService } from 'src/tutor-profile/tutor-profile.service';
import { GetUserResponse } from './dto/response/get-user.response';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly tutorProfileService: TutorProfileService,
    private readonly learnerProfileService: LearnerProfileService,
  ) {}

  @Get()
  async getUser(
    @TokenPayload() { userId }: ITokenPayload,
  ): Promise<GetUserResponse> {
    const user = await this.userService.findOneById(userId);

    const tutorProfile =
      await this.tutorProfileService.findTutorProfileByUserId(userId);

    const learnerProfile =
      await this.learnerProfileService.findLearnerProfileByUserId(userId);

    return {
      user,
      tutorProfile,
      learnerProfile,
    };
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
