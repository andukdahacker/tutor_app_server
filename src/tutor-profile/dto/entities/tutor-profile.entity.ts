import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TutorProfile } from '@prisma/client';
import { UserEntity } from 'src/user/dto/entity/user.entity';

export class TutorProfileEntity implements TutorProfile {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  bio: string;

  @ApiPropertyOptional({ type: () => UserEntity })
  user?: UserEntity;

  constructor({ user, ...data }: TutorProfileEntity) {
    Object.assign(this, data);

    this.user = user != null ? new UserEntity(user) : null;
  }
}
