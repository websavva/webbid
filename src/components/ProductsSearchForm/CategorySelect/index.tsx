'use client';

import { useEffect, useState } from 'react';
import flatry from 'await-to-js';

import type { DefineProps } from '@/types';
import { trpcClient } from '@/lib/trpc';
import { Select } from '@/components/UI/Select';

import type { ProductCategory } from '#server/cms/collections/types';
import { toast } from 'sonner';

export type ProductsCategorySelectProps = Omit<
  DefineProps<
    {
      disabled?: boolean;
      category?: string;
    },
    HTMLButtonElement
  >,
  'onChange'
> & {
  onChange: (category?: string) => any;
};

export const ProductsCategorySelect = ({
  category,
  disabled,

  onChange,

  className,
  ...attrs
}: ProductsCategorySelectProps) => {
  const [allCategories, setAllCategories] = useState<ProductCategory[]>([]);

  useEffect(() => {
    async function fetchAllCategories() {
      const [err, { docs: allCategories = [] } = {}] = await flatry(
        trpcClient.products.categories.getCategories.query({
          perPage: null,
        }),
      );

      if (err) {
        return toast.error('Load of categories has failed !', {
          dismissible: true,
        });
      }

      setAllCategories(allCategories);
    }

    fetchAllCategories();
  }, []);

  const derivedDisabled = !allCategories.length || disabled;

  const onCategoryChange = (category: string | undefined) => {
    onChange(category);
  };

  const options = allCategories.map(({ label, name: id }) => ({
    id,
    label,
  }));

  return (
    <Select
      value={category}
      onChange={onCategoryChange}
      disabled={derivedDisabled}
      options={options}
      canBeEmpty
      emptyLabel='All Categories'
    />
  );
};
