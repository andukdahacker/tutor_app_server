import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { paginate } from 'src/shared/utils/pagination.utils';
import { CreateSubjectInput, FindManySubjectsInput } from './dto/inputs';

import { BaseResponse } from 'src/shared/types/base_response';
import { Paginated } from 'src/shared/types/pagination.type';
import { SubjectEntity } from './dto/entities';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  async createSubject(@Body() body: CreateSubjectInput) {
    const subject = await this.subjectService.createSubject(body);

    return subject;
  }

  @Get()
  async subjects(
    @Query() body: FindManySubjectsInput,
  ): Promise<BaseResponse<Paginated<SubjectEntity>>> {
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

    return {
      statusCode: 200,
      data: result,
    };
  }
}
