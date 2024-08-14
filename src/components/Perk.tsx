import { HTMLAttributes } from 'react';
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
        'flex flex-col items-center max-lg:grid max-lg:grid-cols-[auto_1fr] max-lg:grid-rows-[auto_auto]',
        className
      )}
    >
      <div className='flex items-center bg-blue-200 justify-center rounded-full size-20 text-blue-800 max-lg:row-span-full'>
        <Icon className='w-2/6 h-2/6' />
      </div>

      <p className='my-5 text-gray-600 font-semibold text-lg'>{title}</p>

      <p className='text-muted-foreground'>{description}</p>
    </div>
  );
}
