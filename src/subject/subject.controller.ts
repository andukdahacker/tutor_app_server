import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/shared/decorators/public.decorator';
import { paginate } from 'src/shared/utils/pagination.utils';
import { CreateSubjectInput, FindManySubjectsInput } from './dto/inputs';
import { FindManySubjectsRespones } from './dto/response';
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
  @Public()
  async subjects(
    @Body() body: FindManySubjectsInput,
  ): Promise<FindManySubjectsRespones> {
    const subjects = await this.subjectService.findManySubject(body);
    return paginate(
      subjects,
      'id',
      async (cursor: string) =>
        await this.subjectService.findManySubject({
          stringCursor: cursor,
          ...body,
        }),
    );
  }
}
