import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude, Transform } from 'class-transformer';
import { EducationEntity } from 'src/education/dto/entities';
import { LearnerProfileEntity } from 'src/learner-profile/dto/entities';
import { ToTimestamp } from 'src/shared/utils/transform.utils';
import { TutorProfileEntity } from 'src/tutor-profile/dto/entities/tutor-profile.entity';
import { WorkExperienceEntity } from 'src/work-experience/dto/entities';

export class UserEntity implements User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @Exclude()
  password: string;

  @ApiProperty()
  isVerified: boolean;

  @ApiProperty()
  avatar: string;

  @ApiProperty({ type: () => LearnerProfileEntity })
  learnerProfile?: LearnerProfileEntity;

  @ApiProperty({ type: () => TutorProfileEntity })
  tutorProfile?: TutorProfileEntity;

  @ApiProperty({ type: 'number' })
  @Transform(ToTimestamp)
  createdAt: Date;

  @ApiProperty({ type: () => [WorkExperienceEntity] })
  workExperience?: WorkExperienceEntity[];

  @ApiProperty({ type: () => [EducationEntity] })
  education?: EducationEntity[];

  @ApiProperty({ type: 'number' })
  @Transform(ToTimestamp)
  updatedAt: Date;

  constructor({
    learnerProfile,
    tutorProfile,
    education,
    workExperience,
    ...user
  }: UserEntity) {
    Object.assign(this, user);

    this.learnerProfile = learnerProfile
      ? new LearnerProfileEntity(learnerProfile)
      : null;

    this.tutorProfile = tutorProfile
      ? new TutorProfileEntity(tutorProfile)
      : null;

    this.education = education
      ? education.map((e) => new EducationEntity(e))
      : [];

    this.workExperience = workExperience
      ? workExperience.map((e) => new WorkExperienceEntity(e))
      : [];
  }
}
