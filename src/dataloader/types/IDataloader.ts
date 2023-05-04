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
  leanerProfileByTutorRequestLoader: DataLoader<string, LearnerProfile>;
  subjectByTutorRequestLoader: DataLoader<string, Subject>;
  connectionsByTutorRequestLoader: DataLoader<string, JobConnection[]>;
}
