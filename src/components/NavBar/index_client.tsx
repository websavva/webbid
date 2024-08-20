'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MenuIcon } from 'lucide-react';

import { publicEnv } from '#server/env/public';

import { useAuth } from '@/hooks/use-auth';
import { DefineProps } from '@/types';
import { Logo } from '@/components/UI/Logo';
import { Container } from '@/components/UI/Container';
import { cn } from '@/lib/utils/cn';

import type { ProductCategory } from '#server/cms/collections/types';

import { NavBarCategoryMenu } from './CategoryMenu';
import { NavBarRightMenu } from './RightMenu';
import { useOnFullPathUpdate } from '@/hooks/use-full-path';

export type ClientNavBarProps = DefineProps<
  {
    categories: ProductCategory[];
  },
  HTMLElement
>;

export function ClientNavBar({
  categories,
  className,
  ...attrs
}: ClientNavBarProps) {
  const { isGuest } = useAuth();

  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  useOnFullPathUpdate(() => {
    setIsMobileMenuOpened(false);
  }, [setIsMobileMenuOpened]);

  return (
    <nav
      className={cn(
        'flex justify-center max-sm:border-b-2 border-gray-100 fixed min-h-[var(--nav-bar-height,5rem)] top-0 bg-white w-full z-40',
        className,
      )}
      {...attrs}
    >
      <Container className='sm:flex flex-col sm:flex-row sm:items-center sm:border-b-2 border-gray-100 w-full relative'>
        <div className='flex items-center justify-between h-[var(--nav-bar-height,5rem)] sm:h-auto'>
          <Link href='/' className='mr-8 flex items-center'>
            <Logo className='w-10 h-10' />

            <span className='block sm:hidden ml-5 font-semibold text-xl'>
              {publicEnv.COMPANY_NAME}
            </span>
          </Link>

          <button className='flex sm:hidden ml-auto items-center'>
            <MenuIcon
              onClick={() => setIsMobileMenuOpened((isOpened) => !isOpened)}
            />
          </button>
        </div>

        <div
          className={cn(
            'flex flex-col sm:mt-0 sm:flex-row sm:items-center sm:justify-between sm:flex-1 max-h-0 sm:max-h-none pointer-events-none sm:pointer-events-auto opacity-0 sm:opacity-100 transition-all sm:transition-none',
            {
              ['max-h-screen opacity-100 pointer-events-auto pt-3']:
                isMobileMenuOpened,
            },
          )}
        >
          <span className='text-gray-400 text-sm mb-2 sm:hidden'>
            Categories
          </span>

          <NavBarCategoryMenu categories={categories} />

          <span className='text-gray-400 text-sm mt-5 mb-4 sm:hidden'>
            {isGuest ? 'Authentication' : 'User'}
          </span>

          <NavBarRightMenu className='max-sm:pb-2' />
        </div>
      </Container>
    </nav>
  );
}
