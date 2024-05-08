'use client';
import { useRouter, useParams } from 'next/navigation';

import type { DefineProps } from '@/types';

import type { ProductsForm } from './config';
import { ProductsSortSelect, type ProductsSortBaseOption } from './SortSelect';
import { ProductsCategorySelect } from './CategorySelect';
import { cn } from '@/lib/utils/cn';
import { withQuery } from 'ufo';

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
  const router = useRouter();
  const query = useParams();

  const submitForm = (form: ProductsForm) => {
    if (onSubmit) return onSubmit(form);

    const updatedHref = withQuery('/products', form);

    router.push(updatedHref);
  };

  const onSortChange = (sortOption: ProductsSortBaseOption) => {
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

  return (
    <form {...attrs} className={cn('flex items-center space-x-5', className)}>
      <ProductsSortSelect
        sortBy={form.sortBy}
        sortDir={form.sortDir}
        disabled={pending}
        onChange={onSortChange}
      />

      <ProductsCategorySelect
        category={form.category}
        disabled={pending}
        onChange={onCategoryChange}
      />
    </form>
  );
};
