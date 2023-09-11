import { Chat } from '@prisma/client';
import { Paginated } from 'src/shared/types/pagination.type';

export class GetChatsResponse extends Paginated<Chat> {}
