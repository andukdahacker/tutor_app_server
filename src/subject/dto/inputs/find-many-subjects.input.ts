import { Transform } from 'class-transformer';

export class FindManySubjectsInput {
  @Transform((params) => Number.parseInt(params.value))
  take: number;
  stringCursor?: string;
  searchString: string;
}
