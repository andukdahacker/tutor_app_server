import { registerEnumType } from '@nestjs/graphql';

export enum SortBy {
  asc = 'asc',
  desc = 'desc',
}

registerEnumType(SortBy, { name: 'SortBy' });
