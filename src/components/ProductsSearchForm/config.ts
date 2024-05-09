import { z } from 'zod';

import {
  GetProductsQuerySchema,
} from '#server/dtos/products';

export const ProductsFormSchema = GetProductsQuerySchema.pick({
  category: true,
  sortDir: true,
  sortBy: true,
});

export type ProductsForm = z.infer<typeof ProductsFormSchema>;

export const defaultForm = ProductsFormSchema.parse({});
