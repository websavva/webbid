'use client';

import type { DefineProps } from '@/types';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

import {
  ProductsFormSchema,
  type ProductsForm,
  PRODUCTS_SORT_OPTIONS,
} from './config';

export type ProductsSearchFormProps = DefineProps<
  {
    form: ProductsForm;
    pending?: boolean;
    onSubmit: (form: ProductsForm) => any;
  },
  HTMLFormElement
>;

export const ProductsSearchForm = ({
  form,
  pending,
  onSubmit,
}: ProductsSearchFormProps) => {
  const activeSortOption = PRODUCTS_SORT_OPTIONS.find(
    ({ fieldName: sortBy, dir: sortDir }) => {
      return form.sortBy === sortBy && form.sortDir === sortDir;
    }
  )!;

  const onSortChange = (id: string) => {
    const { fieldName: sortBy, dir: sortDir } = PRODUCTS_SORT_OPTIONS.find(
      (option) => option.id
    )!;

    const newForm = {
      ...form,
      sortBy,
      sortDir,
    };

    onSubmit(newForm);
  };

  return (
    <form>
      <Select onValueChange={onSortChange} value={String(activeSortOption.id)}>
        <SelectTrigger>
          <SelectValue placeholder='Sorting'>
            {activeSortOption.label}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          {PRODUCTS_SORT_OPTIONS.map(({ label, fieldName, dir }) => {
            const id = [fieldName, dir].join('-');

            return (
              <SelectItem key={id} value={id}>
                {label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </form>
  );
};
