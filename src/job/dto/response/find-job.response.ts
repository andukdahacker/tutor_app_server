import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/shared/types/pagination.type';
import { Job } from '../entities';
@ObjectType()
export class FindJobResponse extends Paginated(Job) {}
