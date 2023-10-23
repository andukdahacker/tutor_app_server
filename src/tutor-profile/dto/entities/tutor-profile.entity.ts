import { TutorProfile } from '@prisma/client';
import { UserEntity } from 'src/user/dto/entity/user.entity';

export class TutorProfileEntity implements TutorProfile {
  userId: string;

  id: string;

  bio: string;

  user?: UserEntity;

  constructor({ user, ...data }: TutorProfileEntity) {
    Object.assign(this, data);

    if (user) {
      this.user = new UserEntity(user);
    }
  }
}
