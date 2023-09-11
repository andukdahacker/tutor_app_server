import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ITokenPayload } from 'src/auth/types';
import { TokenPayload } from 'src/shared/decorators/current-user.decorator';
import { CreateEducationInput, UpdateEducationInput } from './dto/inputs';
import { EducationService } from './education.service';

@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post()
  async createEducation(
    @Body()
    input: CreateEducationInput,
    @TokenPayload() { userId }: ITokenPayload,
  ) {
    return await this.educationService.createEducation(userId, input);
  }

  @Put()
  async updateEducation(@Body() input: UpdateEducationInput) {
    return await this.educationService.updateEducation(input);
  }

  @Delete(':id')
  async deleteEducation(@Param('id') id: string) {
    return await this.educationService.deleteEducation(id);
  }
}
