import { cn } from '@/lib/utils/cn';

import type { DefineProps } from '@/types';

function Skeleton({ className, ...props }: DefineProps<{}, HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
}

export { Skeleton };
