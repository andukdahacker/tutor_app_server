import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TutorProfileSubject } from '@prisma/client';
import { SubjectEntity } from 'src/subject/dto/entities';
import { TutorProfileEntity } from './tutor-profile.entity';

export class TutorProfileSubjectEntity implements TutorProfileSubject {
  @ApiProperty()
  tutorId: string;

  @ApiPropertyOptional({ type: () => TutorProfileEntity, nullable: true })
  tutorProfile?: TutorProfileEntity;

  @ApiProperty()
  subjectId: string;

  @ApiPropertyOptional({ type: () => SubjectEntity, nullable: true })
  subject?: SubjectEntity;

  constructor({ tutorProfile, subject, ...data }: TutorProfileSubjectEntity) {
    Object.assign(this, data);

    this.tutorProfile =
      tutorProfile != null ? new TutorProfileEntity(tutorProfile) : null;

    this.subject = subject != null ? new SubjectEntity(subject) : null;
  }
}
