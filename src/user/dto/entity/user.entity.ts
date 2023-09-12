import { User } from '@prisma/client';
import { Exclude, Transform } from 'class-transformer';
import { ToTimestamp } from 'src/shared/utils/transform.utils';

export class UserEntity implements User {
  id: string;
  username: string;
  email: string;

  @Exclude()
  password: string;

  isVerified: boolean;
  avatar: string;

  @Transform(ToTimestamp)
  createdAt: Date;

  @Transform(ToTimestamp)
  updatedAt: Date;

  constructor(user: User) {
    Object.assign(this, user);
  }
}
