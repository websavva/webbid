import { z } from 'zod';

import {
  GetProductsQuerySchema,
  type GetProductsSortableFieldName,
} from '#server/dtos/products';

import { SortDir } from '@/consts/sort-dir';

export const ProductsFormSchema = GetProductsQuerySchema.pick({
  category: true,
  sortDir: true,
  sortBy: true,
});

export type ProductsForm = z.infer<typeof ProductsFormSchema>;
