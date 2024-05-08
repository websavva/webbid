'use client';

import type { DefineProps } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

import { PRODUCTS_SORT_OPTIONS, type ProductsSortBaseOption } from './config';
import { cn } from '@/lib/utils/cn';

export type ProductsSortSelectProps = Omit<
  DefineProps<
    ProductsSortBaseOption & {
      disabled?: boolean;
    },
    HTMLButtonElement
  >,
  'onChange'
> & {
  onChange: (option: ProductsSortBaseOption) => any;
};

export * from './config';

export const ProductsSortSelect = ({
  sortBy,
  sortDir,
  disabled,

  onChange,

  className,
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
    <Select onValueChange={onSortChange} value={String(activeSortOption.id)}>
      <SelectTrigger {...attrs} className={cn('', className)}>
        <SelectValue placeholder='Sorting'>
          {activeSortOption.label}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        {PRODUCTS_SORT_OPTIONS.map(({ label, id }) => {
          return (
            <SelectItem key={id} value={id}>
              {label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
