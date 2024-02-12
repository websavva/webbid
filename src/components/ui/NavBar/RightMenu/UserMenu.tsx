'use client';
import Link from 'next/link';

import { LogOut, User, MenuSquare } from 'lucide-react';

import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils/cn';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

export function UserMenu({
  className
}: {
  className?: string
}) {
  const { user, isAdmin } = useAuth();

  const { email } = user!;

  const avatarCharacter = email[0].toUpperCase();

  const login = email.split('@')[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn('flex items-center space-x-3 outline-none', className)}>
          <span className='size-9 text-base shrink-0 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center'>
            {avatarCharacter}
          </span>

          <span>{login}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>My account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href='/profile' className='flex items-center cursor-pointer'>
              <User className='mr-2 h-4 w-4' />

              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          {isAdmin && (
            <DropdownMenuItem asChild>
              <Link href='/admin' className='flex items-center cursor-pointer'>
                <MenuSquare className='mr-2 h-4 w-4' />

                <span>Admin Dashboard</span>
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href='/logout' className='flex items-center cursor-pointer'>
            <LogOut className='mr-2 h-4 w-4' />
            <span>Log out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
