import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/shared/types/pagination.type';
import { TutorProfile } from '../entities';

@ObjectType()
export class FindManyTutorProfilesResponse extends Paginated(TutorProfile) {}
