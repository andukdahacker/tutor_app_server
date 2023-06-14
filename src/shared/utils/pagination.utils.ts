import { IPaginated } from '../types/pagination.type';
import { ArrayUtils } from './array.utils';

export async function paginate<T, K extends keyof T>(
  results: T[],
  cursorField: K,
  nextQuery: (cursor: string | number) => Promise<T[]>,
): Promise<IPaginated<T>> {
  if (results.length > 0) {
    const last = ArrayUtils.last(results);

    const cursor = last[cursorField];

    const resultsFromNextQuery = await nextQuery(cursor as any);

    if (resultsFromNextQuery.length > 0) {
      return {
        nodes: results,
        pageInfo: {
          hasNextPage: true,
          lastTake: resultsFromNextQuery.length,
          totalAmount: results.length,
          cursor: {
            value: cursor as any,
          },
        },
      };
    }

    return {
      nodes: results,
      pageInfo: {
        hasNextPage: false,
        lastTake: 0,
        totalAmount: results.length,
      },
    };
  }

  return {
    nodes: results,
    pageInfo: {
      hasNextPage: false,
      lastTake: 0,
      totalAmount: results.length,
    },
  };
}
