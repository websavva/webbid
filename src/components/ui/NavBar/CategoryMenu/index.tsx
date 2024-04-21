'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils/cn';
import { useClickOutside } from '@/hooks/use-click-outside';
import { DefineProps } from '@/types';
import type { ProductCategory } from '@/server/cms/collections/types';

import { NavBarCategoryDropdown } from './Dropdown';

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
    () => activeCategoryId && setActiveCategoryId(null)
  );

  return (
    <div
      ref={elementRef}
      className={cn('flex items-center space-x-3', className)}
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
