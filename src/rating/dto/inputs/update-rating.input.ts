import { IsNumber } from 'class-validator';

export class UpdateRatingInput {
  @IsNumber()
  score: number;

  raterId: string;

  ratedId: string;

  jobId: string;

  comment?: string;
}
