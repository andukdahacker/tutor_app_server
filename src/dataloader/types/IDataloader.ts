import { TutorProfileSubject } from '@prisma/client';
import DataLoader from 'dataloader';
import { TutorRequestConnection } from 'src/connection/dto/entities';
import { User } from 'src/user/dto/entities';

export interface IDataloader {
  usersLoader: DataLoader<string, User>;
  connectionsByTutorIdLoader: DataLoader<string, TutorRequestConnection>;
  tutorProfileSubjectByTutorIdLoader: DataLoader<string, TutorProfileSubject>;
}
