import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Edge } from '../utils/pagination/create-edge-type.util';
import { IEdge } from './edge.type';
import { IPageInfo, PageInfoType } from './page-info.type';

export interface IPaginated<T> {
  take: number;
  edges: IEdge<T>[];
  pageInfo: IPageInfo;
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginated<T>> {
  @ObjectType(`${classRef.name}Edge`)
  abstract class EdgeType extends Edge(classRef) {}

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginated<T> {
    @Field(() => Int)
    public take: number;

    @Field(() => [EdgeType])
    public edges: EdgeType[];

    @Field(() => PageInfoType)
    public pageInfo: PageInfoType;
  }
  return PaginatedType as Type<IPaginated<T>>;
}
