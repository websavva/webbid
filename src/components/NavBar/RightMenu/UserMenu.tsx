'use client';
import Link from 'next/link';

import { LogOut, User, MenuSquare, ReceiptIcon } from 'lucide-react';

import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils/cn';
import { UserAvatar } from '@/components/UI/UserAvatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/UI/DropdownMenu';
import { useToggle } from '@/hooks/use-toggle';
import { useOnFullPathUpdate } from '@/hooks/use-full-path';

export function UserMenu({ className }: { className?: string }) {
  const { user, isAdmin } = useAuth();

  const { value: open, onUpdate: onOpenChange, onDeactivate } = useToggle();

  const { email } = user!;

  const login = email.split('@')[0];

  useOnFullPathUpdate(() => {
    onDeactivate();
  }, [onDeactivate]);

  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'flex items-center space-x-2 outline-none sm:space-x-3',
            className,
          )}
        >
          <UserAvatar
            email={email}
            className='size-7 shrink-0 text-sm sm:size-9 sm:text-base'
          />

          <span>{login}</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>My account</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              href='/profile'
              className='flex w-full cursor-pointer items-center'
            >
              <User className='mr-2 size-4' />

              <span>Profile</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href='/orders'
              className='flex w-full cursor-pointer items-center'
            >
              <ReceiptIcon className='mr-2 size-4' />

              <span>Orders</span>
            </Link>
          </DropdownMenuItem>

          {isAdmin && (
            <DropdownMenuItem asChild>
              <Link
                href='/admin'
                className='flex w-full cursor-pointer items-center'
              >
                <MenuSquare className='mr-2 size-4' />

                <span>Admin Dashboard</span>
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link
            href='/logout'
            className='flex w-full cursor-pointer items-center'
          >
            <LogOut className='mr-2 size-4' />
            <span>Log out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
