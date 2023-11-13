import { ApiProperty } from '@nestjs/swagger';

export interface IPageInfo {
  hasNextPage: boolean;
  cursor?: string | number;
  lastTake: number;
  totalAmount: number;
}

export abstract class PageInfoType implements IPageInfo {
  @ApiProperty()
  hasNextPage: boolean;

  @ApiProperty({ oneOf: [{ type: 'string' }, { type: 'number' }] })
  cursor?: string | number;

  @ApiProperty()
  lastTake: number;

  @ApiProperty()
  totalAmount: number;
}
