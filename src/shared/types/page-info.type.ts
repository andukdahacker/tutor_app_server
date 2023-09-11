export interface IPageInfo {
  hasNextPage: boolean;
  cursor?: string | number;
  lastTake: number;
  totalAmount: number;
}

export abstract class PageInfoType implements IPageInfo {
  hasNextPage: boolean;

  cursor?: string | number;

  lastTake: number;

  totalAmount: number;
}
