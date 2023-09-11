import { Paginated } from 'src/shared/types/pagination.type';
import { Notification } from '../entities';

export class GetManyNotificationsResponse extends Paginated<Notification> {}
