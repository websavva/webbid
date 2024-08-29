'use client';

import { Container } from '@/components/UI/Container';
import { ErrorIcon } from '@/components/Icons/ErrorIcon';
import { TRPCClientError } from '@trpc/client';

interface AppErrorPageProps {
  error: Error | { message: string };
}

export default function AppErrorPage({ error }: AppErrorPageProps) {
  let message: string;

  if (error instanceof TRPCClientError) {
    const { code } = error.data;

    switch (code) {
      case 'UNAUTHORIZED':
        message = 'You have not been authenticated !';
        break;
      default:
        message = error.message;
    }
  } else {
    message = error.message;
  }

  return (
    <Container className='flex flex-col items-center py-16 mx-auto'>
      <ErrorIcon className='max-w-lg' />

      <div className='mt-8 text-xl text-center font-semibold text-gray-800'>
        {message}
      </div>
    </Container>
  );
}
