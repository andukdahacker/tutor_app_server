import { Body, Controller, Post, Put } from '@nestjs/common';
import { ITokenPayload } from 'src/auth/types/ITokenPayload';
import { TokenPayload } from 'src/shared/decorators/current-user.decorator';
import {
  CreateLearnerProfileInput,
  UpdateLearnerProfileInput,
} from './dto/inputs';
import { LearnerProfileService } from './learner-profile.service';

@Controller('learner-profile')
export class LearnerProfileController {
  constructor(private readonly profileService: LearnerProfileService) {}

  @Post()
  async createLearnerProfile(
    @Body()
    body: CreateLearnerProfileInput,
    @TokenPayload() payload: ITokenPayload,
  ) {
    return await this.profileService.createLearnerProfile(body, payload.userId);
  }

  @Put()
  async updateLearnerProfile(
    @Body() input: UpdateLearnerProfileInput,
    @TokenPayload() payload: ITokenPayload,
  ) {
    return await this.profileService.updateLearnerProfile(
      input,
      payload.userId,
    );
  }
}
