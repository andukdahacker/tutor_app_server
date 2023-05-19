import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/shared/types/pagination.type';
import { Subject } from '../entities';

@ObjectType()
export class FindManySubjectsRespones extends Paginated(Subject) {}
