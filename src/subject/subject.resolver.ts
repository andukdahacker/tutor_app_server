import { Resolver } from '@nestjs/graphql';
import { SubjectService } from './subject.service';

@Resolver()
export class SubjectResolver {
  constructor(private readonly subjectService: SubjectService) {}
}
