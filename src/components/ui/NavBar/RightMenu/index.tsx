'use client';

import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils/cn';
import { DefineProps } from '@/types';

import { UserMenu } from './UserMenu';
import { GuestMenu } from './GuestMenu';
import { ShoppingCart } from '../ShoppingCart';

export type NavBarUserMenuProps = DefineProps<{}>;

export function NavBarRightMenu({ className, ...attrs }: NavBarUserMenuProps) {
  const { isGuest } = useAuth();

  return (
    <div className={cn('flex items-center', className)} {...attrs}>
      {isGuest ? <GuestMenu /> : <UserMenu className='mr-2'/>}

      <span className='w-[2px] h-6 bg-gray-200 mx-2' />

      <ShoppingCart />
    </div>
  );
}
