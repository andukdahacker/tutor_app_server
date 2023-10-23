import { Transform } from 'class-transformer';

export class FindManyTutorProfilesInput {
  searchString: string;

  stringCursor?: string;

  @Transform((params) => Number.parseInt(params.value))
  take: number;
}
