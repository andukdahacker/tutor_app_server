import { Paginated } from 'src/shared/types/pagination.type';
import { Job } from '../entities';

export class FindJobResponse extends Paginated<Job> {}
