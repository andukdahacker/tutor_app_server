import { TutorProfile } from '@prisma/client';
import { Paginated } from 'src/shared/types/pagination.type';

export class FindManyTutorProfilesResponse extends Paginated<TutorProfile> {}
