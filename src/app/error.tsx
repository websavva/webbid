'use client';

import { TRPCClientError } from '@trpc/client';

import { ErrorFrame } from '@/components/UI/ErrorFrame';

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

  return <ErrorFrame message={message} />;
}
