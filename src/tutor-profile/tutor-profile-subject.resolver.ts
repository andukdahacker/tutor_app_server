import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { IDataloader } from 'src/dataloader/types/IDataloader';
import { Loaders } from 'src/shared/decorators/dataloader.decorator';
import { TutorProfileSubject } from './dto/entities/tutor-profile-subject.entity';

@Resolver(() => TutorProfileSubject)
export class TutorProfileSubjectResolver {
  @ResolveField()
  tutor(
    @Parent() tutorProfileSubject: TutorProfileSubject,
    @Loaders() loaders: IDataloader,
  ) {
    const tutor = loaders.tutorProfileSubjectByTutorIdLoader.load(
      tutorProfileSubject.tutorId,
    );

    return tutor;
  }
}
