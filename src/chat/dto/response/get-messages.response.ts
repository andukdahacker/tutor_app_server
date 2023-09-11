import { ChatMessage } from '@prisma/client';
import { Paginated } from 'src/shared/types/pagination.type';

export class GetMessagesResponse extends Paginated<ChatMessage> {}
