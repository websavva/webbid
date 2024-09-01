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
        'group flex items-center space-x-2 text-sm font-semibold text-blue-700',
        className,
      )}
    >
      <span>{children}</span>

      <ArrowRightIcon className='size-[1em] transition-transform group-hover:translate-x-1' />
    </Link>
  );
};
