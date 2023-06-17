import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Subject } from 'src/subject/dto/entities';
import { TutorProfile } from './tutor-profile.entity';

@ObjectType()
export class TutorProfileSubject {
  @Field(() => TutorProfile, { nullable: true })
  tutor?: TutorProfile;

  @HideField()
  tutorId: string;

  @Field(() => Subject, { nullable: true })
  subject?: Subject;

  @HideField()
  subjectId: string;
}
