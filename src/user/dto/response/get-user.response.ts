import { LearnerProfile, TutorProfile, User } from '@prisma/client';

export class GetUserResponse {
  user: User;
  tutorProfile?: TutorProfile;
  learnerProfile?: LearnerProfile;
}
