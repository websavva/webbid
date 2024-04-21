import { z } from 'zod';

import { PaginationQuerySchema } from '../pagination';
import { getSortQuerySchema } from '../sort';

export const SORTABLE_FIELDS = ['createdAt', 'price', 'updatedAt'] as const;

export const GetProductsQuerySchema = PaginationQuerySchema.merge(
  getSortQuerySchema(SORTABLE_FIELDS)
).extend({
  category: z.string().optional(),
});

export type GetProductsQuery = z.infer<typeof GetProductsQuerySchema>;
