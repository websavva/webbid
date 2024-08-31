import { z } from 'zod';

import { SortDir } from '@/consts/sort-dir';

export const getSortQuerySchema = <
  U extends string,
  T extends readonly [U, ...U[]] | [U, ...U[]],
>(
  fields: T,
  defaultSortBy?: T[number],
) => {
  return z.object({
    sortDir: z.nativeEnum(SortDir).optional().default(SortDir.Desc),
    sortBy: z
      .enum(fields)
      .optional()
      .default(defaultSortBy || ('createdAt' as T[number])),
  });
};

export const DefaultSortQuerySchema = getSortQuerySchema(['createdAt']);
