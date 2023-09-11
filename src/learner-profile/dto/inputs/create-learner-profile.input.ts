import { IsString } from 'class-validator';

export class CreateLearnerProfileInput {
  @IsString()
  bio: string;
}
