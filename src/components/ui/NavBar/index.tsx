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
    <nav className='flex justify-center sticky h-[80px] top-0 bg-white w-full'>
      <Container className='flex justify-between items-center border-b-2 border-gray-100 w-[1280px]'>
        <div className='flex items-center'>
          <Logo className='w-10 h-10 mr-8' />

          {PRODUCT_CATEGORIES.map((category) => {
            return (
              <NavBarCategoryDropdown
                key={category.id}
                category={category}
                isActive={activeCategoryId === category.id}
                onToggle={(isActive: boolean) => {
                  setActiveCategoryId(isActive ? category.id : null);
                }}
                className='mr-3'
              />
            );
          })}
        </div>

        <div />
      </Container>
    </nav>
  );
}
