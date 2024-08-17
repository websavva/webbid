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

export function UserMenu({ className }: { className?: string }) {
  const { user, isAdmin } = useAuth();

  const { email } = user!;

  const login = email.split('@')[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn('flex items-center space-x-3 outline-none', className)}
        >
          <UserAvatar email={email} className='size-9 text-base shrink-0' />

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
              className='flex items-center cursor-pointer w-full'
            >
              <User className='mr-2 h-4 w-4' />

              <span>Profile</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href='/orders'
              className='flex items-center cursor-pointer w-full'
            >
              <ReceiptIcon className='mr-2 h-4 w-4' />

              <span>Orders</span>
            </Link>
          </DropdownMenuItem>

          {isAdmin && (
            <DropdownMenuItem asChild>
              <Link
                href='/admin'
                className='flex items-center cursor-pointer w-full'
              >
                <MenuSquare className='mr-2 h-4 w-4' />

                <span>Admin Dashboard</span>
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link
            href='/logout'
            className='flex items-center cursor-pointer w-full'
          >
            <LogOut className='mr-2 h-4 w-4' />
            <span>Log out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
