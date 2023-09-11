import { JobConnection, TutorProfileSubject, User } from '@prisma/client';

export class TutorProfileResponse {
  id: string;

  bio?: string;

  user?: User;

  userId: string;

  jobConnections?: JobConnection[];

  tutorProfileSubjects?: TutorProfileSubject[];
}
