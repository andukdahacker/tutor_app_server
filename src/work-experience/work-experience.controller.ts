import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ITokenPayload } from 'src/auth/types';
import { TokenPayload } from 'src/shared/decorators/current-user.decorator';
import {
  CreateWorkExperienceInput,
  UpdateWorkExperienceInput,
} from './dto/inputs';
import { WorkExperienceService } from './work-experience.service';

@Controller('work-experience')
export class WorkExperienceController {
  constructor(private readonly workExperienceService: WorkExperienceService) {}

  @Post()
  async createWorkExperience(
    @Body() input: CreateWorkExperienceInput,
    @TokenPayload() { userId }: ITokenPayload,
  ) {
    return await this.workExperienceService.createWorkExperience(userId, input);
  }

  @Put()
  async updateWorkExperience(@Body() input: UpdateWorkExperienceInput) {
    return await this.workExperienceService.updateWorkExperience(input);
  }

  @Delete(':id')
  async deleteWorkExperience(@Param('id') id: string) {
    return await this.workExperienceService.deleteWorkExperience(id);
  }
}
