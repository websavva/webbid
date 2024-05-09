'use client';
import { useRouter } from 'next/navigation';
import { withQuery } from 'ufo';

import type { DefineProps } from '@/types';
import { cn } from '@/lib/utils/cn';
import { transformFormToQuery } from '@/lib/utils/transform-from-to-query';

import { defaultForm, type ProductsForm } from './config';
import { ProductsSortSelect, type ProductsSortBaseOption } from './SortSelect';
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
  const router = useRouter();

  const submitForm = (form: ProductsForm) => {
    if (onSubmit) return onSubmit(form);

    const query = transformFormToQuery(form, defaultForm);

    const updatedHref = withQuery('/products', query);

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
