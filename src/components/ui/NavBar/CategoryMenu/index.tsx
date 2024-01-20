'use client';

import { useState } from 'react';

import { PRODUCT_CATEGORIES } from '@/config/product-categories';
import { cn } from '@/lib/utils/cn';
import { useClickOutside } from '@/hooks/use-click-outside';
import { DefineProps } from '@/types';

import { NavBarCategoryDropdown } from './Dropdown';

export type NavBarCategoryMenuProps = DefineProps<{}, HTMLDivElement>;

export function NavBarCategoryMenu({
  className,
  ...attrs
}: NavBarCategoryMenuProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const { elementRef } = useClickOutside<HTMLDivElement>(
    () => activeCategoryId && setActiveCategoryId(null)
  );

  return (
    <div
      ref={elementRef}
      className={cn('flex items-center space-x-3', className)}
      {...attrs}
    >
      {PRODUCT_CATEGORIES.map((category) => {
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
