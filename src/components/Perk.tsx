import type { HTMLAttributes } from 'react';
import { type LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils/cn';

export interface PerkProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  Icon: LucideIcon;
}

export function Perk({ className, Icon, title, description }: PerkProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-x-6 gap-y-2 max-lg:grid max-lg:grid-cols-[auto_1fr] max-lg:grid-rows-[auto_auto]',
        className,
      )}
    >
      <div className='flex size-20 items-center justify-center rounded-full bg-blue-200 text-blue-800 max-lg:row-span-full'>
        <Icon className='size-2/6' />
      </div>

      <p className='w-max text-xl font-semibold text-gray-600 lg:my-6'>
        {title}
      </p>

      <p className='max-w-prose text-muted-foreground'>{description}</p>
    </div>
  );
}
