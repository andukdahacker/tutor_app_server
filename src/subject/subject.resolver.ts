import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Public } from 'src/shared/decorators/public.decorator';
import { ArrayUtils } from 'src/shared/utils/array.utils';
import { Subject } from './dto/entities';
import { CreateSubjectInput, FindManySubjectsInput } from './dto/inputs';
import {
  CreateSubjectResponse,
  FindManySubjectsRespones,
} from './dto/response';
import { SubjectService } from './subject.service';

@Resolver(() => Subject)
export class SubjectResolver {
  constructor(private readonly subjectService: SubjectService) {}

  @Mutation(() => CreateSubjectResponse)
  async createSubject(@Args('createSubjectInput') input: CreateSubjectInput) {
    const subject = await this.subjectService.createSubject(input);

    return {
      subject,
    };
  }

  @Query(() => FindManySubjectsRespones)
  @Public()
  async subjects(
    @Args('findManySubjectsInput') input: FindManySubjectsInput,
  ): Promise<FindManySubjectsRespones> {
    const subjects = await this.subjectService.findManySubject(input);

    if (subjects.length > 0) {
      const lastSubject = ArrayUtils.last(subjects);
      const cursor = lastSubject.id;

      const nextQuery = await this.subjectService.findManySubject({
        stringCursor: cursor,
        ...input,
      });

      if (nextQuery.length > 0) {
        return {
          nodes: subjects,
          pageInfo: {
            hasNextPage: true,
            lastTake: nextQuery.length,
            totalAmount: subjects.length,
            cursor: { value: cursor },
          },
        };
      }
    }

    return {
      nodes: subjects,
      pageInfo: {
        hasNextPage: false,
        lastTake: 0,
        totalAmount: subjects.length,
      },
    };
  }
}
