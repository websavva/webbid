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
      {isGuest ? <GuestMenu /> : <UserMenu />}

      <ShoppingCart />
    </div>
  );
}
