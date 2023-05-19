import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/shared/types/pagination.type';
import { JobConnection } from '../entities';

@ObjectType()
export class GetRequestedJobsForTutorResponse extends Paginated(
  JobConnection,
) {}
