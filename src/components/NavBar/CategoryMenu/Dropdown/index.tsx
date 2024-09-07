'use client';

import { ChevronDownIcon, XIcon } from 'lucide-react';

import type { DefineProps } from '@/types';
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
        className='flex items-center text-base max-sm:px-0 max-sm:hover:bg-transparent'
        onClick={() => onToggle(!isActive)}
      >
        <span>{category.label}</span>

        <ChevronDownIcon
          className={cn('ml-2 h-4 w-4 transition-transform', {
            'rotate-180': isActive,
          })}
        />
      </Button>

      {isActive && (
        <div className='fixed left-0 top-0 flex w-full justify-center overflow-auto bg-white py-7 shadow-sm duration-500 animate-in fade-in-0 slide-in-from-bottom-8 max-sm:h-screen sm:top-[var(--nav-bar-height,5rem)]'>
          <button
            className='absolute right-4 top-4 block sm:hidden'
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
