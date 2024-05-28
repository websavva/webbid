import { cn } from '@/lib/utils/cn';
import type { DefineProps } from '@/types';

export const EmailEnvelopeIcon = ({
  className,
  ...props
}: DefineProps<{}, SVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    aria-label='Email'
    viewBox='0 0 512 512'
    className={cn('text-blue-500', className)}
    {...props}
  >
    <rect width={512} height={512} rx='15%' className='fill-current' />
    <rect width={356} height={256} x={78} y={128} fill='#fff' rx='8%' />
    <path
      fill='none'
      strokeWidth={20}
      className='stroke-current'
      d='M434 128 269 292c-7 8-19 8-26 0L78 128m0 256 129-128m227 128L305 256'
    />
  </svg>
);
