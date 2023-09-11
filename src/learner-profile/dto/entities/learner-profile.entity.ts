import { User } from '@prisma/client';

export class LearnerProfile {
  id: string;

  bio?: string;

  userId?: string;

  user?: User;
}
