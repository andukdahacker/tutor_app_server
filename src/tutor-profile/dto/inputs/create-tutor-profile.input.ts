import { IsString } from 'class-validator';

export class CreateTutorProfileInput {
  @IsString()
  bio: string;
}
