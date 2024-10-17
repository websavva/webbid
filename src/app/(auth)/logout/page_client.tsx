'use client';
import type { Metadata } from 'next';

import { useEffect } from 'react';
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/hooks/use-auth';
import { useApi, UseApiStatus } from '@/hooks/use-api';
import { Alert, AlertTitle, AlertDescription } from '@/components/UI/Alert';
import { Button } from '@/components/UI/Button';
import { wait } from '@/lib/utils/wait';
import TransitionFade from '@/components/UI/TransitionFade';

export const metadata: Metadata = {
  title: 'Log Out',
};

export const middlewares = ['auth'];

export default function LogoutPage() {
  const router = useRouter();
  const { logout } = useAuth();

  const {
    status,

    makeApiCall: triggerLogout,
  } = useApi(
    async () => {
      // delay for decoration purposes only (workaround)
      await wait(1e3);

      return logout();
    },
    {
      onSuccess: () => router.push('/'),
      initialStatus: UseApiStatus.Pending,
    },
  );

  useEffect(() => {
    triggerLogout();
  }, []);

  return (
    <TransitionFade
      className='flex w-full flex-col items-center'
      transitionKey={status}
    >
      {(key) =>
        key === 'error' ? (
          <>
            <Alert variant={'destructive'} className='mb-8 w-full sm:w-1/2'>
              <AlertTitle className='text-2xl'>Error</AlertTitle>

              <AlertDescription className='text-base'>
                Oops, something went wrong ! We apologize for inconvenience...
              </AlertDescription>
            </Alert>

            <Button
              variant={'secondary'}
              size='default'
              onClick={triggerLogout}
            >
              Try again
            </Button>
          </>
        ) : (
          <>
            <Loader2Icon className='size-36 animate-spin stroke-[1] text-gray-600 sm:size-48' />

            <div className='mt-8 text-center text-lg text-gray-700 sm:mt-12 sm:text-xl'>
              Logging out...
            </div>
          </>
        )
      }
    </TransitionFade>
  );
}
