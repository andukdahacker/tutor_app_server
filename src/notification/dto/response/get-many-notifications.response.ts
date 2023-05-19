import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/shared/types/pagination.type';
import { Notification } from '../entities';

@ObjectType()
export class GetManyNotificationsResponse extends Paginated(Notification) {}
