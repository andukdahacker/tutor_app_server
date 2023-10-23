import { User } from '@prisma/client';
import { JobEntity } from 'src/job/dto/entities';
export class Rating {
  score: number;

  comment?: string;

  rater: User;

  raterId: string;

  rated: User;

  ratedId: string;

  job: JobEntity;

  jobId: string;

  createdAt: Date;

  updatedAt?: Date;
}
