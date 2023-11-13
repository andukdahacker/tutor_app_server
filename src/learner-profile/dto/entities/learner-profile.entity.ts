import { ApiProperty } from '@nestjs/swagger';
import { LearnerProfile } from '@prisma/client';
import { UserEntity } from 'src/user/dto/entity/user.entity';

export class LearnerProfileEntity implements LearnerProfile {
  @ApiProperty()
  id: string;

  @ApiProperty()
  bio: string;

  @ApiProperty()
  userId: string;

  @ApiProperty({ type: () => UserEntity })
  user?: UserEntity;

  // @ApiProperty({ type: () => [JobEntity] })
  // jobs?: JobEntity[];

  constructor({ user, ...data }: Partial<LearnerProfileEntity>) {
    Object.assign(this, data);

    if (user) {
      this.user = new UserEntity(user);
    }
  }
}
