import { Paginated } from 'src/shared/types/pagination.type';
import { JobConnectionEntity } from '../entities';

export class GetRequestedJobsForTutorResponse extends Paginated<JobConnectionEntity> {}
