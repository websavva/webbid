'use client';

import { ChevronDown } from 'lucide-react';

import { DefineProps } from '@/types';
import { Button } from '@/components/ui/Button';

import type { ProductCategory } from '#server/cms/collections/types';
import { cn } from '@/lib/utils/cn';
import { Container } from '@/components/ui/Container';

import { NavBarCategoryDropdownFeatures } from './Features';

export type NavBarCategoryDropdownProps = DefineProps<
  {
    category: ProductCategory;
    isActive: boolean;

    onToggle: (isActive: boolean) => any;
  },
  HTMLDivElement
>;

export function NavBarCategoryDropdown({
  isActive,
  category,
  onToggle,
  className,
  ...attrs
}: NavBarCategoryDropdownProps) {
  return (
    <div className={cn(className)} {...attrs}>
      <Button
        variant={isActive ? 'default' : 'ghost'}
        size={'sm'}
        className='text-base flex items-center'
        onClick={() => onToggle(!isActive)}
      >
        <span>{category.label}</span>

        <ChevronDown
          className={cn('ml-2 transition-transform w-4 h-4', {
            'rotate-180': isActive,
          })}
        />
      </Button>

      {isActive && (
        <div className='bg-white w-full absolute left-0 top-20 py-7 animate-in duration-500 fade-in-0 slide-in-from-bottom-8 flex justify-center shadow-sm'>
          <Container>
            <NavBarCategoryDropdownFeatures categoryId={category.id} />
          </Container>
        </div>
      )}
    </div>
  );
}
