'use client';

import { type HTMLAttributes, useState } from 'react';

import { PRODUCT_CATEGORIES } from '@/config/product-categories';

import { Logo } from '../Logo';
import { Container } from '../Container';

import { NavBarCategoryDropdown } from './CategoryDropdown';

export interface NavBarProps extends HTMLAttributes<HTMLElement> {}

export function NavBar({ className, ...atrrs }: NavBarProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  return (
    <nav className='flex justify-center sticky top-0 bg-white w-full'>
      <Container className='flex justify-between items-center py-7 border-b-2 border-gray-100'>
        <div className='flex items-center'>
          <Logo className='w-12 h-12 mr-8' />

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

        <div />
      </Container>
    </nav>
  );
}
