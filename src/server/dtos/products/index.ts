import { z } from 'zod';

import { PaginationQuerySchema } from '../pagination';
import { getSortQuerySchema } from '../sort';

export const SORTABLE_FIELDS = ['createdAt', 'price'] as const;

export type GetProductsSortableFieldName = (typeof SORTABLE_FIELDS)[number];

export const GetProductsQuerySchema = PaginationQuerySchema.merge(
  getSortQuerySchema(SORTABLE_FIELDS),
).extend({
  category: z.string().optional(),
  except: z.array(z.number()).optional(),
  include: z.array(z.number()).optional(),
});

export type GetProductsQuery = z.infer<typeof GetProductsQuerySchema>;
