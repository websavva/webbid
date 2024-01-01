import { HTMLAttributes, SVGAttributes } from 'react';

import { cn } from '@/lib/utils';

export interface LogoProps extends SVGAttributes<SVGAElement> {}

export function Logo({ className, ...attrs }: LogoProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 524.87'
      className={className}
      {...(attrs as any)}
    >
      <path
        d='M468.93,108.89h-52.95V372.91c0,23.79-19.28,43.07-43.07,43.07H96.02v65.82c0,23.79,19.28,43.07,43.07,43.07H468.93c23.79,0,43.07-19.28,43.07-43.07V151.96c0-23.79-19.28-43.07-43.07-43.07Z'
        className='fill-gray-600'
      />
      <path
        d='M415.98,372.91V43.07C415.98,19.28,396.7,0,372.91,0H43.07C19.28,0,0,19.28,0,43.07V372.91C0,396.7,19.28,415.98,43.07,415.98H372.91c23.79,0,43.07-19.28,43.07-43.07Z'
        className='fill-primary'
      />
    </svg>
  );
}
