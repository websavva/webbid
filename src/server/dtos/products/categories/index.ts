import { z } from 'zod';

import { DefaultSortQuerySchema } from '../../sort';
import { PaginationQuerySchema } from '../../pagination';

export const GetProductCategoriesQuerySchema = PaginationQuerySchema.merge(
  DefaultSortQuerySchema
);

export type GetProductCategoriesQuerySchema = z.infer<
  typeof GetProductCategoriesQuerySchema
>;
