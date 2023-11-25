import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { paginate } from 'src/shared/utils/pagination.utils';
import { CreateSubjectInput, FindManySubjectsInput } from './dto/inputs';

import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorResponse } from 'src/shared/types/error_response';
import {
  ApiOkPaginatedResponse,
  Paginated,
} from 'src/shared/types/pagination.type';
import { SubjectEntity } from './dto/entities';
import { SubjectService } from './subject.service';

@ApiTags('Subject')
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  @ApiOkResponse({ type: SubjectEntity })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @ApiUnauthorizedResponse({ type: ErrorResponse })
  async createSubject(
    @Body() body: CreateSubjectInput,
  ): Promise<SubjectEntity> {
    const subject = await this.subjectService.createSubject(body);

    return new SubjectEntity(subject);
  }

  @Get()
  @ApiOkPaginatedResponse(SubjectEntity)
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @ApiUnauthorizedResponse({ type: ErrorResponse })
  async subjects(
    @Query() body: FindManySubjectsInput,
  ): Promise<Paginated<SubjectEntity>> {
    const subjects = await this.subjectService.findManySubject(body);
    const result = await paginate(
      subjects,
      'id',
      async (cursor: string) =>
        await this.subjectService.findManySubject({
          stringCursor: cursor,
          ...body,
        }),
    );

    return result;
  }
}
