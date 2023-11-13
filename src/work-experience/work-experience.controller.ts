import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorResponse } from 'src/shared/types/error_response';
import { WorkExperienceEntity } from './dto/entities';
import {
  CreateWorkExperienceInput,
  UpdateWorkExperienceInput,
} from './dto/inputs';
import { WorkExperienceService } from './work-experience.service';

@ApiTags('Work Experience')
@Controller('work-experience')
export class WorkExperienceController {
  constructor(private readonly workExperienceService: WorkExperienceService) {}

  @Post()
  @ApiOkResponse({ type: WorkExperienceEntity })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @ApiUnauthorizedResponse({ type: ErrorResponse })
  async createWorkExperience(
    @Body() input: CreateWorkExperienceInput,
    @Req() req,
  ) {
    const workExperience =
      await this.workExperienceService.createWorkExperience(
        req.user.userId,
        input,
      );

    return new WorkExperienceEntity(workExperience);
  }

  @Put()
  @ApiOkResponse({ type: WorkExperienceEntity })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @ApiUnauthorizedResponse({ type: ErrorResponse })
  async updateWorkExperience(@Body() input: UpdateWorkExperienceInput) {
    const workExperience =
      await this.workExperienceService.updateWorkExperience(input);

    return new WorkExperienceEntity(workExperience);
  }

  @Delete(':id')
  @ApiOkResponse({ type: WorkExperienceEntity })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @ApiUnauthorizedResponse({ type: ErrorResponse })
  async deleteWorkExperience(@Param('id') id: string) {
    const workExperience =
      await this.workExperienceService.deleteWorkExperience(id);

    return new WorkExperienceEntity(workExperience);
  }
}
