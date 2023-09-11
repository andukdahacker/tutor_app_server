import { IPageInfo, PageInfoType } from './page-info.type';

export interface IPaginated<T> {
  nodes: T[];
  pageInfo: IPageInfo;
}

export abstract class Paginated<T> implements IPaginated<T> {
  nodes: T[];

  pageInfo: PageInfoType;
}
