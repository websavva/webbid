import { type HTMLAttributes } from 'react';

import { Logo } from '../Logo';
import { Container } from '../Container';

export interface NavBarProps extends HTMLAttributes<HTMLElement> {}

export function NavBar({}: NavBarProps) {
  return (
    <nav className='flex justify-center'>
      <Container className='flex justify-between items-center py-10 sticky top-0 border-b border-gray-100'>
        <div className='flex items-center'>
          <Logo className='w-14 h-14' />
        </div>

        <div />
      </Container>
    </nav>
  );
}
