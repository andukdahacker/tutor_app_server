import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/shared/types/pagination.type';
import { TutorRequest } from '../entities';

@ObjectType()
export class FindTutorRequestResponse extends Paginated(TutorRequest) {}
