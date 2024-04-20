import { z } from 'zod';

import { SortDir } from '@/consts/sort-dir';

import { PaginationQuerySchema } from '../pagination';
import { formatPaginationParams } from '@/server/utils/query';

export const SORTABLE_FIELDS = ['createdAt', 'price', 'updatedAt'] as const;

export const GetProductsQuerySchema = PaginationQuerySchema.extend({
  category: z.string().optional(),

  sortDir: z.nativeEnum(SortDir).optional().default(SortDir.Desc),
  sortBy: z.enum(SORTABLE_FIELDS),
});

export type GetProductsQuery = z.infer<typeof GetProductsQuerySchema>;
