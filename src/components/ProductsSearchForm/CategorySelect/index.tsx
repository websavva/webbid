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

import type { ProductCategory } from '#server/cms/collections/types';
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

const EMPTY_VALUE = 'empty';
const PLACEHOLDER = 'All Categories';

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

  const onValueChange = (category: string) => {
    onChange(category === EMPTY_VALUE ? undefined : category);
  };

  return (
    <Select onValueChange={onValueChange} value={category || EMPTY_VALUE}>
      <SelectTrigger
        {...attrs}
        disabled={derivedDisabled}
        className={cn('', className)}
      >
        <SelectValue>{activeCategory?.label || PLACEHOLDER}</SelectValue>
      </SelectTrigger>

      <SelectContent>
        <SelectItem key={EMPTY_VALUE} value={EMPTY_VALUE}>
          {PLACEHOLDER}
        </SelectItem>

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
