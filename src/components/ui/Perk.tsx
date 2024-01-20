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
    <div className={cn('flex flex-col items-center', className)}>
      <div className='flex items-center bg-blue-200 justify-center rounded-full w-20 h-20 text-blue-800'>
        <Icon className='w-2/6 h-2/6' />
      </div>

      <p className='my-5 text-gray-600 font-semibold text-lg'>{title}</p>

      <p className='text-muted-foreground'>{description}</p>
    </div>
  );
}
