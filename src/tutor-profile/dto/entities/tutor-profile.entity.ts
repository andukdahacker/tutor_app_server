import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TutorProfile } from '@prisma/client';
import { UserEntity } from 'src/user/dto/entity/user.entity';
import { TutorProfileSubjectEntity } from './tutor-profile-subject-entity';

export class TutorProfileEntity implements TutorProfile {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  bio: string;

  @ApiPropertyOptional({ type: () => UserEntity })
  user?: UserEntity;

  @ApiPropertyOptional({
    type: () => [TutorProfileSubjectEntity],
    nullable: true,
  })
  tutorProfileSubject?: TutorProfileSubjectEntity[];

  constructor({
    user,
    tutorProfileSubject: tutorProfileSubjects,
    ...data
  }: TutorProfileEntity) {
    Object.assign(this, data);

    this.user = user != null ? new UserEntity(user) : null;

    this.tutorProfileSubject =
      tutorProfileSubjects?.map((e) => new TutorProfileSubjectEntity(e)) ?? [];
  }
}
