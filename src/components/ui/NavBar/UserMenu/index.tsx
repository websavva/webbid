import { type ReactNode } from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { DefineProps } from '@/types';
import { Button } from '@/components/ui/Button';

import { ShoppingCart } from '../ShoppingCart';

export type NavBarUserMenuProps = DefineProps<{}>;

export const AUTH_LINKS = [
  {
    label: 'Sign In',
    href: '/login',
  },
  {
    label: 'Create account',
    href: '/sign-up',
  },
];

export function NavBarUserMenu({ className, ...attrs }: NavBarUserMenuProps) {
  const isGuest = true;

  const userMenuItems: ReactNode[] = [];

  if (isGuest) {
    userMenuItems.push(
      ...AUTH_LINKS.map(({ label, href }) => (
        <Button
          key={href}
          variant='ghost'
          asChild
          size='sm'
          className='text-base'
        >
          <Link href={href}>{label}</Link>
        </Button>
      ))
    );
  } else {
  }

  userMenuItems.push(<ShoppingCart />);

  return (
    <div className={cn('flex items-center', className)} {...attrs}>
      {userMenuItems.map(userMenuItem => <>
        {userMenuItem}
        
        <span className='h-6 w-[2px] bg-gray-300 mx-4 last:mr-0'/>
      </>)}
    </div>
  );
}
