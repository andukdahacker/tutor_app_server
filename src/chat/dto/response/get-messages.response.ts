import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/shared/types/pagination.type';
import { ChatMessage } from '../entities';

@ObjectType()
export class GetMessagesResponse extends Paginated(ChatMessage) {}
