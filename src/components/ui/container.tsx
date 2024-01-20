import { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils/cn';

export function Container({
  className,
  children,
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('max-w-screen-xl', className)}>{children}</div>;
}
