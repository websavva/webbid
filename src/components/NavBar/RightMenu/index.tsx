'use client';

import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils/cn';
import type { DefineProps } from '@/types';

import { ShoppingCart } from '../ShoppingCart';

import { UserMenu } from './UserMenu';
import { GuestMenu } from './GuestMenu';

export type NavBarUserMenuProps = DefineProps<{}>;

export function NavBarRightMenu({ className, ...attrs }: NavBarUserMenuProps) {
  const { isGuest } = useAuth();

  return (
    <div
      className={cn(
        'flex flex-col items-start sm:flex-row sm:items-center',
        className,
      )}
      {...attrs}
    >
      {isGuest ? <GuestMenu /> : <UserMenu className='mb-2 sm:mb-0 sm:mr-2' />}

      <span className='mx-2 hidden h-6 w-[2px] bg-gray-200 sm:block' />

      <ShoppingCart />
    </div>
  );
}
