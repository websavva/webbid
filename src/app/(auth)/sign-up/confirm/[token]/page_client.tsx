'use client';

import { Loader2Icon, AlertCircleIcon, MailCheckIcon } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import type { PagePropsWithParams } from '@/types/page-props';
import { Button } from '@/components/UI/Button';
import { trpcClient } from '@/lib/trpc';
import { wait } from '@/lib/utils/wait';
import { useApi } from '@/hooks/use-api';
import TransitionFade from '@/components/UI/TransitionFade';

export default function SignUpConfirmClientPage({
  params: { token },
}: PagePropsWithParams<{
  token: string;
}>) {
  const router = useRouter();

  const { status, makeApiCall: onConfirmAccount } = useApi(
    async (token: string) => {
      return trpcClient.auth.confirmSignUp.mutate({
        token,
      });
    },
    {
      onError(err) {
        toast.error(err.message, {
          dismissible: true,
        });
      },

      async onSuccess() {
        // forcing delay for decoration only
        await wait(1e3);

        await router.push('/login');
      },
    },
  );

  useEffect(() => {
    onConfirmAccount(token);
  }, [token]);

  return (
    <TransitionFade
      transitionKey={status}
      className='flex w-full flex-col items-center'
    >
      {(key) => {
        switch (key) {
          case 'success':
            return (
              <>
                <MailCheckIcon className='size-32 stroke-1 text-primary sm:size-44' />

                <p className='mt-6 text-center font-light xs:w-3/4 sm:w-96 sm:text-lg'>
                  Congratulations ! Your account has been confirmed successfully
                  confirmed&nbsp;!
                </p>

                <p className='mt-5 flex items-center space-x-2 font-light text-gray-500 sm:text-lg'>
                  <span>Redirecting</span>

                  <Loader2Icon className='mt-1 w-[1em] animate-spin' />
                </p>
              </>
            );
          case 'error':
            return (
              <>
                <AlertCircleIcon className='size-32 stroke-1 text-red-400 sm:size-44' />

                <p className='mt-6 text-lg font-light'>
                  Ops, something went wrong..
                </p>

                <Button
                  className='mt-5 text-base sm:mt-10'
                  variant={'secondary'}
                  onClick={() => onConfirmAccount(token)}
                >
                  Try again
                </Button>
              </>
            );
          default:
            return (
              <>
                <Loader2Icon className='size-32 animate-spin stroke-1 text-slate-600 sm:size-44' />

                <p className='mt-6 font-light sm:text-lg'>
                  Confirming your account...
                </p>
              </>
            );
        }
      }}
    </TransitionFade>
  );
}
