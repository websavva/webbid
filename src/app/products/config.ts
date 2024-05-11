import { z } from 'zod';

import { GetProductsQuerySchema } from '#server/dtos/products';
import { ProductsFormSchema } from '@/components/ProductsSearchForm/config';

export const ProductsPageSearchParamsSchema = ProductsFormSchema.merge(
  GetProductsQuerySchema.pick({
    page: true,
  })
);

export type ProductsPageSearchParams = z.infer<
  typeof ProductsPageSearchParamsSchema
>;

export const PRODUCTS_PER_PAGE = 6;
