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
      {AUTH_LINKS.map(({ label, href }) => (
        <>
          <Button
            key={href}
            variant='ghost'
            asChild
            size='sm'
            className='text-base'
          >
            <Link href={href}>{label}</Link>
          </Button>

          <span className='w-[2px] h-6 bg-gray-200 mx-5' />
        </>
      ))}
    </>
  );
}
