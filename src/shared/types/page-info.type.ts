import { Field, ObjectType } from '@nestjs/graphql';

export interface IPageInfo {
  hasNextPage: boolean;
}

@ObjectType('PageInfo')
export abstract class PageInfoType implements IPageInfo {
  @Field(() => Boolean)
  public hasNextPage: boolean;
}
