'use client';

import { type HTMLAttributes, useState } from 'react';

import { PRODUCT_CATEGORIES } from '@/config/product-categories';
import { cn } from '@/lib/utils';
import { useClickOutside } from '@/hooks/use-click-outside';

import { NavBarCategoryDropdown } from './Dropdown';

export interface NavBarCategoryMenuProps
  extends HTMLAttributes<HTMLDivElement> {}

export function NavBarCategoryMenu({
  className,
  ...attrs
}: NavBarCategoryMenuProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const { elementRef } = useClickOutside<HTMLDivElement>(() =>
    setActiveCategoryId(null)
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
