import { Paginated } from 'src/shared/types/pagination.type';
import { Subject } from '../entities';

export class FindManySubjectsRespones extends Paginated<Subject> {}
