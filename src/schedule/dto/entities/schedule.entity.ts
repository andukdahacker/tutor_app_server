import { User } from '@prisma/client';

export class Schedule {
  id: string;

  userId: string;

  user: User;
}
