import { HTMLAttributes } from 'react';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface InfoItemProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  Icon: LucideIcon;
}

export function InfoItem({ className, Icon, title, description }: InfoItemProps) {
  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className='flex items-center justify-center w-20 h-20'>
        <Icon className='w-4/5' />
      </div>

      <p className='my-5 text-gray-600 font-semibold'>
        { title }
      </p>

      <p className='text-muted-foreground'>
        { description }
      </p>
    </div>
  );
}
