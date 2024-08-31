import Link from 'next/link';

import { cn } from '@/lib/utils/cn';
import type { DefineProps } from '@/types';

export interface BreadcrumbItem {
  href?: string | null;
  name: string;
}

export type BreadcrumbsProps = DefineProps<{
  items: BreadcrumbItem[];
}>;

export const Breadcrumbs = ({
  items,
  className,
  ...attrs
}: BreadcrumbsProps) => {
  return (
    <div {...attrs} className={cn('flex items-center font-medium', className)}>
      {items.map(({ href, name }, index, { length: itemsCount }) => {
        return (
          <>
            {href ? <Link href={href}>{name}</Link> : <span>{name}</span>}

            {index + 1 !== itemsCount && (
              <span className='px-5 opacity-30'>/</span>
            )}
          </>
        );
      })}
    </div>
  );
};
