import { IsString } from 'class-validator';

export class UpdateTutorProfileInput {
  @IsString()
  bio: string;
}
