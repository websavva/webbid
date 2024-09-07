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
      className={cn(
        'mx-auto flex w-full flex-col items-center py-16',
        className,
      )}
    >
      <ErrorIcon className='w-full max-w-lg' />

      <div className='mt-8 text-center text-xl font-semibold text-gray-800'>
        {message}
      </div>

      {children}
    </Container>
  );
}
