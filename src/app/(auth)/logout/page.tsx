'use client';
import { useEffect } from 'react';
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/hooks/use-auth';
import { useApi } from '@/hooks/use-api';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { wait } from '@/lib/utils/wait';

export default function LogoutPage() {
  const router = useRouter();
  const { logout } = useAuth();

  const {
    isError,

    makeApiCall: triggerLogout,
  } = useApi(async () => {
    // delay for decoration purposes only (workaround)
    await wait(1e3);

    await logout();


    await router.push('/');
  });

  useEffect(() => {
    triggerLogout();
  }, []);

  if (isError) {
    return (
      <>
        <Alert variant={'destructive'} className='mb-8 w-1/2'>
          <AlertTitle className='text-2xl'>Error</AlertTitle>

          <AlertDescription className='text-lg'>
            Oops, something went wrong ! We apologize for inconvenience...
          </AlertDescription>
        </Alert>

        <Button variant={'secondary'} size={'sm'} onClick={triggerLogout}>
          Try again
        </Button>
      </>
    );
  } else {
    return (
      <>
        <Loader2Icon className='size-48 animate-spin text-gray-600 stroke-[1]' />

        <div className='text-gray-700 text-xl text-center mt-12'>
          Logging out...
        </div>
      </>
    );
  }
}
