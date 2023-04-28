import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Cursor, IntCursor, StringCursor } from './cursor.type';

export interface IPageInfo {
  hasNextPage: boolean;
  cursor?: StringCursor | IntCursor;
  lastTake: number;
  totalAmount: number;
}

@ObjectType('PageInfo')
export abstract class PageInfoType implements IPageInfo {
  @Field(() => Boolean)
  public hasNextPage: boolean;

  @Field(() => Cursor, { nullable: true })
  cursor?: StringCursor | IntCursor;

  @Field(() => Int)
  lastTake: number;

  @Field(() => Int)
  totalAmount: number;
}
