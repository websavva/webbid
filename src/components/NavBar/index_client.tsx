'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MenuIcon } from 'lucide-react';

import { publicEnv } from '#server/env/public';

import { useAuth } from '@/hooks/use-auth';
import type { DefineProps } from '@/types';
import { Logo } from '@/components/UI/Logo';
import { Container } from '@/components/UI/Container';
import { cn } from '@/lib/utils/cn';
import { useScreenMediaQueries } from '@/hooks/use-screen-media-queries';

import type { ProductCategory } from '#server/cms/collections/types';

import { useOnFullPathUpdate } from '@/hooks/use-full-path';

import { NavBarCategoryMenu } from './CategoryMenu';
import { NavBarRightMenu } from './RightMenu';

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

  const { ['max-sm']: isMaxSm } = useScreenMediaQueries();

  useOnFullPathUpdate(() => {
    setIsMobileMenuOpened(false);
  }, [setIsMobileMenuOpened]);

  return (
    <nav
      className={cn(
        'fixed top-0 z-40 flex min-h-[var(--nav-bar-height,5rem)] w-full justify-center border-gray-100 bg-white max-sm:border-b-2',
        className,
      )}
      {...attrs}
    >
      <Container className='relative w-full flex-col border-gray-100 sm:flex sm:flex-row sm:items-center sm:border-b-2'>
        <div className='flex h-[var(--nav-bar-height,5rem)] items-center justify-between sm:h-auto'>
          <Link href='/' className='mr-8 flex items-center'>
            <Logo className='size-10' />

            <span className='ml-5 block text-xl font-semibold sm:hidden'>
              {publicEnv.COMPANY_NAME}
            </span>
          </Link>

          <button className='ml-auto flex items-center sm:hidden'>
            <MenuIcon
              onClick={() => setIsMobileMenuOpened((isOpened) => !isOpened)}
            />
          </button>
        </div>

        <div
          className={cn(
            'pointer-events-none flex max-h-0 flex-col opacity-0 sm:pointer-events-auto sm:mt-0 sm:max-h-none sm:flex-1 sm:flex-row sm:items-center sm:justify-between sm:opacity-100 sm:transition-none',
            {
              'transition-all': isMaxSm,
            },
            {
              ['pointer-events-auto max-h-screen pt-3 opacity-100']:
                isMobileMenuOpened,
            },
          )}
        >
          <span className='mb-2 text-sm text-gray-400 sm:hidden'>
            Categories
          </span>

          <NavBarCategoryMenu categories={categories} />

          <span className='mb-4 mt-5 text-sm text-gray-400 sm:hidden'>
            {isGuest ? 'Authentication' : 'User'}
          </span>

          <NavBarRightMenu className='max-sm:pb-2' />
        </div>
      </Container>
    </nav>
  );
}
