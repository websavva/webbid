import { DefineProps } from '@/types';

import { Logo } from '../Logo';
import { Container } from '../Container';
import { NavBarCategoryMenu } from './CategoryMenu';
import { NavBarUserMenu } from './UserMenu';

export type NavBarProps = DefineProps<{}, HTMLElement>;

export function NavBar({ className, ...attrs }: NavBarProps) {
  return (
    <nav
      className='flex justify-center sticky h-20 top-0 bg-white w-full z-40'
      {...attrs}
    >
      <Container className='flex justify-between items-center border-b-2 border-gray-100 w-full'>
        <div className='flex items-center'>
          <Logo className='w-10 h-10 mr-8' />

          <NavBarCategoryMenu />
        </div>
        
        <NavBarUserMenu />
      </Container>
    </nav>
  );
}
