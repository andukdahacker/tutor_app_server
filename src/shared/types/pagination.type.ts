import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';
import { IPageInfo, PageInfoType } from './page-info.type';

export interface IPaginated<T> {
  nodes: T[];
  pageInfo: IPageInfo;
}

export abstract class Paginated<T> implements IPaginated<T> {
  nodes: T[];

  @ApiProperty({ type: () => PageInfoType })
  pageInfo: PageInfoType;
}

export const ApiOkPaginatedResponse = <DataDto extends Type<unknown>>(
  dataDto: DataDto,
) =>
  applyDecorators(
    ApiExtraModels(Paginated, dataDto),
    ApiOkResponse({
      schema: {
        title: `${dataDto}PaginatedResponse`,
        allOf: [
          { $ref: getSchemaPath(Paginated) },
          {
            properties: {
              nodes: {
                type: 'array',
                items: {
                  $ref: getSchemaPath(dataDto),
                },
              },
            },
          },
        ],
      },
    }),
  );
