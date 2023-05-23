import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { Loader } from 'src/dataloader/dataloader';
import { Subject } from 'src/subject/dto/entities';
import { TutorProfileSubject } from './dto/entities/tutor-profile-subject.entity';
import { SubjectByTutorProfileSubjectLoader } from './loaders';
import { TutorProfileSubjectService } from './tutor-profile-subject.service';

@Resolver(() => TutorProfileSubject)
export class TutorProfileSubjectResolver {
  constructor(
    private readonly tutorProfileSubjectService: TutorProfileSubjectService,
  ) {}
  @ResolveField()
  async tutor(@Parent() tutorProfileSubject: TutorProfileSubject) {
    const tutor = await this.tutorProfileSubjectService.findTutor(
      tutorProfileSubject.tutorId,
    );

    return tutor;
  }

  @ResolveField()
  async subject(
    @Parent() tutorProfileSubject: TutorProfileSubject,
    @Loader(SubjectByTutorProfileSubjectLoader)
    loader: DataLoader<string, Subject>,
  ) {
    const subject = loader.load(tutorProfileSubject.tutorId);

    return subject;
  }
}
