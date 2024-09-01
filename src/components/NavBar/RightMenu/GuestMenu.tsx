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
    <div className='flex flex-col items-start max-sm:space-y-4 max-sm:pb-2 sm:flex-row sm:items-center'>
      {AUTH_LINKS.map(({ label, href }, index, { length }) => (
        <Fragment key={href}>
          <Button
            variant='ghost'
            asChild
            size='sm'
            className='text-base max-sm:h-auto max-sm:px-0 max-sm:leading-none max-sm:hover:bg-transparent'
          >
            <Link href={href}>{label}</Link>
          </Button>

          {index + 1 !== length && (
            <span className='mx-3 hidden h-6 w-[2px] bg-gray-200 sm:block' />
          )}
        </Fragment>
      ))}
    </div>
  );
}
