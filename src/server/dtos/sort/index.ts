import { z } from 'zod';

import { SortDir } from '@/consts/sort-dir';

export const getSortQuerySchema = <
  U extends string,
  T extends readonly [U, ...U[]] | [U, ...U[]],
>(
  fields: T,
  defaultSortBy?: T[number],
) => {
  const derivedDefaultSortBy = (defaultSortBy ||
    'createdAt') as z.util.noUndefined<z.Writeable<T>[number]>;

  return z.object({
    sortDir: z.nativeEnum(SortDir).optional().default(SortDir.Desc),
    sortBy: z.enum(fields).optional().default(derivedDefaultSortBy),
  });
};

export const DefaultSortQuerySchema = getSortQuerySchema(['createdAt']);
