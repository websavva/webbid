import type { GetProductsSortableFieldName } from '#server/dtos/products';

import { SortDir } from '@/consts/sort-dir';
import type { SelectOption } from '@/components/ui/Select';

export interface ProductsBaseSortOption {
  sortBy: GetProductsSortableFieldName;
  sortDir: SortDir;
}
export interface ProductsSortOption
  extends SelectOption,
    ProductsBaseSortOption {}

export const PRODUCTS_SORT_OPTIONS = [
  {
    label: 'Price: High to Low',
    sortBy: 'price',
    sortDir: SortDir.Desc,
  },
  {
    label: 'Price: Low to High',
    sortBy: 'price',
    sortDir: SortDir.Asc,
  },
  {
    label: 'Date: New to Old',
    sortBy: 'createdAt',
    sortDir: SortDir.Desc,
  },
  {
    label: 'Date: Old to New',
    sortBy: 'createdAt',
    sortDir: SortDir.Asc,
  },
].map((option) => {
  return {
    id: `${option.sortBy}-${option.sortDir}`,
    ...option,
  };
}) as ProductsSortOption[];
