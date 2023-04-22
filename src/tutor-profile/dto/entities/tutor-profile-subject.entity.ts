import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Subject } from 'src/subject/dto/entities';
import { TutorProfile } from './tutor-profile.entity';

@ObjectType()
export class TutorProfileSubject {
  @Field(() => TutorProfile)
  tutor: TutorProfile;

  @HideField()
  tutorId: string;

  @Field(() => Subject)
  subject: Subject;

  @HideField()
  subjectId: number;
}
