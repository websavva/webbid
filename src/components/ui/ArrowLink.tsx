import type { ForwardRefExoticComponent } from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';

import { cn } from '@/lib/utils/cn';

export type ArrowLinkProps =
  typeof Link extends ForwardRefExoticComponent<infer P> ? P : never;

export const ArrowLink = ({
  className,
  children,
  ...otherProps
}: ArrowLinkProps) => {
  return (
    <Link
      {...otherProps}
      className={cn(
        'font-semibold text-blue-700 space-x-2 flex text-sm items-center group',
        className,
      )}
    >
      <span>{children}</span>

      <ArrowRightIcon className='size-[1em] transition-transform group-hover:translate-x-1' />
    </Link>
  );
};
