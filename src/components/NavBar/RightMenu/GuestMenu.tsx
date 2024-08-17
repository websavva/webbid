import { Fragment } from 'react';
import Link from 'next/link';

import { Button } from '@/components/UI/Button';

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

export function GuestMenu() {
  return (
    <div className='flex flex-col max-sm:space-y-4 max-sm:pb-2 sm:flex-row items-start sm:items-center'>
      {AUTH_LINKS.map(({ label, href }, index, { length }) => (
        <Fragment key={href}>
          <Button
            variant='ghost'
            asChild
            size='sm'
            className='text-base max-sm:h-auto max-sm:leading-none max-sm:px-0 max-sm:hover:bg-transparent'
          >
            <Link href={href}>{label}</Link>
          </Button>

          {index + 1 !== length && (
            <span className='w-[2px] h-6 bg-gray-200 mx-3 hidden sm:block' />
          )}
        </Fragment>
      ))}
    </div>
  );
}
