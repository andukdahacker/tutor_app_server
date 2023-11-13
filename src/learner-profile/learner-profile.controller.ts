import { Body, Controller, Post, Put } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ITokenPayload } from 'src/auth/types/ITokenPayload';
import { TokenPayload } from 'src/shared/decorators/current-user.decorator';
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

  @Post()
  @ApiOkResponse({ type: LearnerProfileEntity })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  async createLearnerProfile(
    @Body()
    body: CreateLearnerProfileInput,
    @TokenPayload() payload: ITokenPayload,
  ) {
    return await this.profileService.createLearnerProfile(body, payload.userId);
  }

  @Put()
  @ApiOkResponse({ type: LearnerProfileEntity })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
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
