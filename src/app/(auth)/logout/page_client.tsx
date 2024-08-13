'use client';

import { useEffect } from 'react';
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/hooks/use-auth';
import { useApi } from '@/hooks/use-api';
import { Alert, AlertTitle, AlertDescription } from '@/components/UI/Alert';
import { Button } from '@/components/UI/Button';
import { wait } from '@/lib/utils/wait';
import TransitionFade from '@/components/UI/TransitionFade';

export default function LogoutClientPage() {
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
    }
  );

  useEffect(() => {
    triggerLogout();
  }, []);

  return (
    <TransitionFade
      className='flex flex-col items-center w-full'
      transitionKey={status}
    >
      {(key) =>
        key === 'error' ? (
          <>
            <Alert variant={'destructive'} className='mb-8 w-1/2'>
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
            <Loader2Icon className='size-48 animate-spin text-gray-600 stroke-[1]' />

            <div className='text-gray-700 text-xl text-center mt-12'>
              Logging out...
            </div>
          </>
        )
      }
    </TransitionFade>
  );
}
