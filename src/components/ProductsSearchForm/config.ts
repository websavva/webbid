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

export interface ProductsSortOption {
  id: string;
  label: string;
  fieldName: GetProductsSortableFieldName;
  dir: SortDir;
}

export const PRODUCTS_SORT_OPTIONS = [
  {
    label: 'Price: High to Low',
    fieldName: 'price',
    dir: SortDir.Desc,
  },
  {
    label: 'Price: Low to High',
    fieldName: 'price',
    dir: SortDir.Asc,
  },
  {
    label: 'Date: New to Old',
    fieldName: 'createdAt',
    dir: SortDir.Desc,
  },
  {
    label: 'Date: Old to New',
    fieldName: 'createdAt',
    dir: SortDir.Asc,
  },
].map((option) => {
  return {
    id: `${option.fieldName}-${option.dir}`,
    ...option,
  };
}) as ProductsSortOption[];
