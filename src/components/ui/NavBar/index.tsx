'use client';

import { type HTMLAttributes } from 'react';

import { PRODUCT_CATEGORIES } from '@/config/product-categories';

import { Logo } from '../Logo';
import { Container } from '../Container';

import { NavBarCategoryDropdown } from './CategoryDropdown';

export interface NavBarProps extends HTMLAttributes<HTMLElement> {}

export function NavBar({}: NavBarProps) {
  return (
    <nav className='flex justify-center sticky top-0 bg-white'>
      <Container className='flex justify-between items-center py-7 border-b-2 border-gray-100'>
        <div className='flex items-center'>
          <Logo className='w-12 h-12' />

          {
            PRODUCT_CATEGORIES.map(category => {
              return <NavBarCategoryDropdown 
                key={category.id}
                category={category}
                isActive={false}
                onToggle={() => {}}
              />
            })
          }
        </div>

        <div />
      </Container>
    </nav>
  );
}
