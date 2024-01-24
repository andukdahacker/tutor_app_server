import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LearnerProfile } from '@prisma/client';
import { JobEntity } from 'src/job/dto/entities';
import { UserEntity } from 'src/user/dto/entity/user.entity';

export class LearnerProfileEntity implements LearnerProfile {
  @ApiProperty()
  id: string;

  @ApiProperty()
  bio: string;

  @ApiProperty()
  userId: string;

  @ApiPropertyOptional({ type: () => UserEntity, nullable: true })
  user?: UserEntity;

  @ApiProperty({ type: () => [JobEntity] })
  jobs?: JobEntity[];

  constructor({ user, jobs, ...data }: LearnerProfileEntity) {
    Object.assign(this, data);

    this.user = user != null ? new UserEntity(user) : null;

    this.jobs = jobs != null ? jobs.map((e) => new JobEntity(e)) : null;
  }
}
