import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { IPageInfo, PageInfoType } from './page-info.type';

export interface IPaginated<T> {
  nodes: T[];
  pageInfo: IPageInfo;
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginated<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginated<T> {
    @Field(() => [classRef])
    nodes: T[];

    @Field(() => PageInfoType)
    pageInfo: PageInfoType;
  }
  return PaginatedType as Type<IPaginated<T>>;
}
