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
  const isGuest = true;

  return (
    <>
      {AUTH_LINKS.map(({ label, href }) => (
        <Button
          key={href}
          variant='ghost'
          asChild
          size='sm'
          className='text-base'
        >
          <Link href={href}>{label}</Link>
        </Button>
      ))}
    </>
  );
}
