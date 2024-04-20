import { z } from 'zod';

import { SortDir } from '@/consts/sort-dir';

import { PaginationQuerySchema } from '../pagination';

export const SORTABLE_FIELDS = ['createdAt', 'price', 'updatedAt'] as const;

export const GetProductsQuerySchema = PaginationQuerySchema.extend({
  category: z.string().optional(),

  sortDir: z.nativeEnum(SortDir).optional().default(SortDir.Desc),
  sortBy: z.enum(SORTABLE_FIELDS).optional().default('createdAt'),
});

export type GetProductsQuery = z.infer<typeof GetProductsQuerySchema>;
