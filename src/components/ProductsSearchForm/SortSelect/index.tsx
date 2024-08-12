'use client';

import type { DefineProps } from '@/types';
import { Select } from '@/components/UI/Select';

import {
  PRODUCTS_SORT_OPTIONS,
  type ProductsSortOption,
  type ProductsBaseSortOption,
} from './config';

export type ProductsSortSelectProps = Omit<
  DefineProps<
    ProductsSortOption & {
      disabled?: boolean;
    },
    HTMLButtonElement
  >,
  'onChange'
> & {
  onChange: (option: ProductsBaseSortOption) => any;
};

export * from './config';

export const ProductsSortSelect = ({
  sortBy,
  sortDir,

  onChange,

  ...attrs
}: ProductsSortSelectProps) => {
  const activeSortOption = PRODUCTS_SORT_OPTIONS.find((option) => {
    return option.sortBy === sortBy && option.sortDir === sortDir;
  })!;

  const onSortChange = (id: string) => {
    const { sortBy, sortDir } = PRODUCTS_SORT_OPTIONS.find(
      (option) => option.id === id
    )!;

    onChange({
      sortBy,
      sortDir,
    });
  };

  return (
    <Select
      {...attrs}
      value={activeSortOption.id}
      onChange={onSortChange}
      options={PRODUCTS_SORT_OPTIONS}
    />
  );
};
