'use client';

import { ChevronDownIcon, XIcon } from 'lucide-react';

import { DefineProps } from '@/types';
import { Button } from '@/components/UI/Button';

import type { ProductCategory } from '#server/cms/collections/types';
import { cn } from '@/lib/utils/cn';
import { Container } from '@/components/UI/Container';

import { NavBarCategoryDropdownFeatures } from './Features';

export type NavBarCategoryDropdownProps = DefineProps<
  {
    category: ProductCategory;
    isActive: boolean;

    onToggle: (isActive: boolean) => any;
  },
  HTMLDivElement
>;

export default function NavBarCategoryDropdown({
  isActive,
  category,
  onToggle,
  ...attrs
}: NavBarCategoryDropdownProps) {
  return (
    <div {...attrs}>
      <Button
        variant={isActive ? 'default' : 'ghost'}
        size={'sm'}
        className='text-base flex items-center max-sm:px-0 max-sm:hover:bg-transparent'
        onClick={() => onToggle(!isActive)}
      >
        <span>{category.label}</span>

        <ChevronDownIcon
          className={cn('ml-2 transition-transform w-4 h-4', {
            'rotate-180': isActive,
          })}
        />
      </Button>

      {isActive && (
        <div className='bg-white w-full fixed overflow-auto max-sm:h-screen left-0 top-0 sm:top-[var(--nav-bar-height,5rem)] py-7 animate-in duration-500 fade-in-0 slide-in-from-bottom-8 flex justify-center shadow-sm'>
          <button
            className='block sm:none absolute right-4 top-4'
            onClick={() => onToggle(false)}
          >
            <XIcon className='size-5 text-gray-700' />
          </button>

          <Container className='pt-5'>
            <NavBarCategoryDropdownFeatures categoryId={category.id} />
          </Container>
        </div>
      )}
    </div>
  );
}
