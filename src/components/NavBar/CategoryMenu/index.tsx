'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils/cn';
import { useClickOutside } from '@/hooks/use-click-outside';
import type { DefineProps } from '@/types';
import { useOnFullPathUpdate } from '@/hooks/use-full-path';
import type { ProductCategory } from '#server/cms/collections/types';

import NavBarCategoryDropdown from './Dropdown';

export type NavBarCategoryMenuProps = DefineProps<
  {
    categories: ProductCategory[];
  },
  HTMLDivElement
>;

export function NavBarCategoryMenu({
  categories,
  className,
  ...attrs
}: NavBarCategoryMenuProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);

  const { elementRef } = useClickOutside<HTMLDivElement>(
    () => activeCategoryId && setActiveCategoryId(null),
  );

  useOnFullPathUpdate(() => {
    setActiveCategoryId(null);
  }, [setActiveCategoryId]);

  return (
    <div
      ref={elementRef}
      className={cn(
        'flex flex-col items-start max-sm:space-y-1 sm:flex-row sm:items-center sm:space-x-3',
        className,
      )}
      {...attrs}
    >
      {categories.map((category) => {
        return (
          <NavBarCategoryDropdown
            key={category.id}
            category={category}
            isActive={activeCategoryId === category.id}
            onToggle={(isActive: boolean) => {
              setActiveCategoryId(isActive ? category.id : null);
            }}
          />
        );
      })}
    </div>
  );
}
