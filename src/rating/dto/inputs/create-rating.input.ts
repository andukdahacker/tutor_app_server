import { IsNumber } from 'class-validator';

export class CreateRatingInput {
  @IsNumber()
  score: number;

  raterId: string;

  ratedId: string;

  jobId: string;

  comment?: string;
}
