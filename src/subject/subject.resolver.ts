import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Subject } from './dto/entities';
import { CreateSubjectInput } from './dto/inputs';
import { CreateSubjectResponse } from './dto/response';
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
}
