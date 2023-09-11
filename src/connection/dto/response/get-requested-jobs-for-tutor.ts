import { Paginated } from 'src/shared/types/pagination.type';
import { JobConnection } from '../entities';

export class GetRequestedJobsForTutorResponse extends Paginated<JobConnection> {}
