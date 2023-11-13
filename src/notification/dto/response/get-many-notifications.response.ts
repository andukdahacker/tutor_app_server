import { Paginated } from 'src/shared/types/pagination.type';
import { NotificationEntity } from '../entities';

export class GetManyNotificationsResponse extends Paginated<NotificationEntity> {}
