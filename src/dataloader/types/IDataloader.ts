import { TutorProfileSubject } from '@prisma/client';
import DataLoader from 'dataloader';
import { JobConnection } from 'src/connection/dto/entities';
import { LearnerProfile } from 'src/learner-profile/dto/entities';
import { Subject } from 'src/subject/dto/entities';
import { User } from 'src/user/dto/entities';

export interface IDataloader {
  usersLoader: DataLoader<string, User>;
  connectionsByTutorIdLoader: DataLoader<string, JobConnection[]>;
  tutorProfileSubjectByTutorIdLoader: DataLoader<string, TutorProfileSubject>;
  leanerProfileByJobLoader: DataLoader<string, LearnerProfile>;
  subjectByJobLoader: DataLoader<string, Subject>;
  connectionsByJobLoader: DataLoader<string, JobConnection[]>;
}
