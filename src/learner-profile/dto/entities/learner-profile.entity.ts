import { LearnerProfile, User } from '@prisma/client';

export class LearnerProfileEntity implements LearnerProfile {
  jobTitle: string;
  avatar: string;
  id: string;

  bio: string;

  userId: string;

  user?: User;

  constructor({ user, ...data }: Partial<LearnerProfileEntity>) {
    Object.assign(this, data);

    if (user) {
      this.user = user;
    }
  }
}
