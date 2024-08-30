import type { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils/cn';
import { Container } from '@/components/UI/Container';
import { ErrorIcon } from '@/components/Icons/ErrorIcon';

export type ErrorFrameProps = PropsWithChildren<{
  message?: string;
  className?: string;
}>;

export function ErrorFrame({
  message = 'Unknown Error',
  className,
  children,
}: ErrorFrameProps) {
  return (
    <Container
      className={cn('flex flex-col items-center w-full py-16 mx-auto', className)}
    >
      <ErrorIcon className='max-w-lg w-full' />

      <div className='mt-8 text-xl text-center font-semibold text-gray-800'>
        {message}
      </div>

      {children}
    </Container>
  );
}
