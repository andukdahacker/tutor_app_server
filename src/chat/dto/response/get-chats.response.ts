import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/shared/types/pagination.type';
import { Chat } from '../entities';

@ObjectType()
export class GetChatsResponse extends Paginated(Chat) {}
