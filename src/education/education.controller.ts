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
} from '@nestjs/swagger';
import { ErrorResponse } from 'src/shared/types/error_response';
import { EducationEntity } from './dto/entities';
import { CreateEducationInput, UpdateEducationInput } from './dto/inputs';
import { EducationService } from './education.service';

@ApiTags('Education')
@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post()
  @ApiOkResponse({ type: EducationEntity })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  async createEducation(
    @Body()
    input: CreateEducationInput,
    @Req() req,
  ) {
    return await this.educationService.createEducation(req.user.userId, input);
  }

  @Put()
  @ApiOkResponse({ type: EducationEntity })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  async updateEducation(@Body() input: UpdateEducationInput) {
    return await this.educationService.updateEducation(input);
  }

  @Delete(':id')
  @ApiOkResponse({ type: EducationEntity })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  async deleteEducation(@Param('id') id: string) {
    return await this.educationService.deleteEducation(id);
  }
}
