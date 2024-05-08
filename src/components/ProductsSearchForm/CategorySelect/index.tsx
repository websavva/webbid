'use client';

import { useEffect, useState } from 'react';
import flatry from 'await-to-js';

import { cn } from '@/lib/utils/cn';
import type { DefineProps } from '@/types';
import { trpcClient } from '@/lib/trpc';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

import type { ProductCategory } from '@/server/cms/collections/types';
import { toast } from 'sonner';

export type ProductsCategorySelectProps =
  | Omit<
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
        })
      );

      if (err) {
        return toast('Load of categories has failed !', {
          dismissible: true,
        });
      }

      setAllCategories(allCategories);
    }

    fetchAllCategories();
  }, []);

  const derivedDisabled = !allCategories.length || disabled;

  const activeCategory = allCategories.find(({ name }) => {
    return name === category;
  });

  return (
    <Select onValueChange={onChange} value={category}>
      <SelectTrigger
        {...attrs}
        disabled={derivedDisabled}
        className={cn('', className)}
      >
        <SelectValue placeholder='Select Category'>{activeCategory?.label || 'Category'}</SelectValue>
      </SelectTrigger>

      <SelectContent>
        {allCategories.map(({ label, name }) => {
          return (
            <SelectItem key={name} value={name}>
              {label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
