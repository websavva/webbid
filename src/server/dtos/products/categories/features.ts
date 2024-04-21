import { z } from 'zod';

import { PaginationQuerySchema } from '../../pagination';

export const GetProductCategoryFeaturesSchema = PaginationQuerySchema.extend({
  categoryId: z.number(),
});

export type GetProductCategoryFeatures = z.infer<
  typeof GetProductCategoryFeaturesSchema
>;
