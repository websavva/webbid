'use client';
import { useRouter } from 'next/navigation';
import { withQuery } from 'ufo';

import type { DefineProps } from '@/types';
import { cn } from '@/lib/utils/cn';
import { transformFormToQuery } from '@/lib/utils/transform-from-to-query';
import { useExtendedRouter } from '@/hooks/use-extended-router';

import { defaultForm, type ProductsForm } from './config';
import { ProductsSortSelect } from './SortSelect';
import { type ProductsBaseSortOption } from './SortSelect/config';
import { ProductsCategorySelect } from './CategorySelect';

export type ProductsSearchFormProps = Omit<
  DefineProps<
    {
      form: ProductsForm;
      pending?: boolean;
    },
    HTMLFormElement
  >,
  'onSubmit'
> & {
  onSubmit?: (form: ProductsForm) => any;
};

export const ProductsSearchForm = ({
  form,
  pending,
  onSubmit,

  className,
  ...attrs
}: ProductsSearchFormProps) => {
  const { router, pending: isRouteUpdating } = useExtendedRouter();

  const submitForm = (form: ProductsForm) => {
    if (onSubmit) return onSubmit(form);

    const query = transformFormToQuery(form, defaultForm);

    const updatedHref = withQuery('/products', query);

    router.push(updatedHref);
  };

  const onSortChange = (sortOption: ProductsBaseSortOption) => {
    const newForm = {
      ...form,
      ...sortOption,
    };

    submitForm(newForm);
  };

  const onCategoryChange = (category?: string) => {
    const newForm = {
      ...form,
      category,
    };

    submitForm(newForm);
  };

  const derivedPending = pending || isRouteUpdating;

  return (
    <form {...attrs} className={cn('flex items-center space-x-5', className)}>
      <ProductsSortSelect
        sortBy={form.sortBy}
        sortDir={form.sortDir}
        disabled={derivedPending}
        onChange={onSortChange}
      />

      <ProductsCategorySelect
        category={form.category}
        disabled={derivedPending}
        onChange={onCategoryChange}
      />
    </form>
  );
};
