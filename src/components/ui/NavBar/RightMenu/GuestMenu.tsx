import { Fragment } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/Button';

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
    <>
      {AUTH_LINKS.map(({ label, href }, index, { length }) => (
        <Fragment key={href}>
          <Button
            variant='ghost'
            asChild
            size='sm'
            className='text-base'
          >
            <Link href={href}>{label}</Link>
          </Button>

          {index + 1 !== length && (
            <span className='w-[2px] h-6 bg-gray-200 mx-3' />
          )}
        </Fragment>
      ))}
    </>
  );
}
