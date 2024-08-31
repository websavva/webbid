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
        'flex flex-col items-center max-lg:grid max-lg:grid-cols-[auto_1fr] max-lg:grid-rows-[auto_auto] gap-x-6 gap-y-2',
        className,
      )}
    >
      <div className='flex items-center bg-blue-200 justify-center rounded-full size-20 text-blue-800 max-lg:row-span-full'>
        <Icon className='w-2/6 h-2/6' />
      </div>

      <p className='lg:my-6 text-gray-600 font-semibold text-xl w-max'>
        {title}
      </p>

      <p className='text-muted-foreground max-w-prose'>{description}</p>
    </div>
  );
}
