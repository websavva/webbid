import { type HTMLAttributes, useState } from 'react';

import { Logo } from '../Logo';
import { Container } from '../Container';
import { NavBarCategoryMenu } from './CategoryMenu';

export interface NavBarProps extends HTMLAttributes<HTMLElement> {}

export function NavBar({ className, ...attrs }: NavBarProps) {
  return (
    <nav
      className='flex justify-center sticky h-[80px] top-0 bg-white w-full'
      {...attrs}
    >
      <Container className='flex justify-between items-center border-b-2 border-gray-100 w-[1280px]'>
        <div className='flex items-center'>
          <Logo className='w-10 h-10 mr-8' />

          <NavBarCategoryMenu />
        </div>

        <div />
      </Container>
    </nav>
  );
}
