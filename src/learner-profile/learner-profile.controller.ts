import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorResponse } from 'src/shared/types/error_response';
import { LearnerProfileEntity } from './dto/entities';
import {
  CreateLearnerProfileInput,
  UpdateLearnerProfileInput,
} from './dto/inputs';
import { LearnerProfileService } from './learner-profile.service';

@ApiTags('Learner Profile')
@Controller('learner-profile')
export class LearnerProfileController {
  constructor(private readonly profileService: LearnerProfileService) {}

  @Get(':userId')
  @ApiOkResponse({ type: LearnerProfileEntity })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  async getLearnerProfile(@Param('userId') userId: string) {
    const learnerProfile =
      await this.profileService.findLearnerProfileByUserId(userId);

    return new LearnerProfileEntity(learnerProfile);
  }

  @Post()
  @ApiOkResponse({ type: LearnerProfileEntity })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  async createLearnerProfile(
    @Body()
    body: CreateLearnerProfileInput,
    @Req() req,
  ) {
    return await this.profileService.createLearnerProfile(
      body,
      req.user.userId,
    );
  }

  @Put()
  @ApiOkResponse({ type: LearnerProfileEntity })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  async updateLearnerProfile(
    @Body() input: UpdateLearnerProfileInput,
    @Req() req,
  ) {
    return await this.profileService.updateLearnerProfile(
      input,
      req.user.userId,
    );
  }
}
