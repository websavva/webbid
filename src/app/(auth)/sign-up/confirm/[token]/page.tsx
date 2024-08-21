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

export default function SignUpConfirmPage({
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
          dismissible: true
        });
      },

      async onSuccess() {
        // forcing delay for decoration only
        await wait(1e3);

        await router.push('/login');
      },
    }
  );

  useEffect(() => {
    onConfirmAccount(token);
  }, [token]);

  return (
    <TransitionFade transitionKey={status} className='w-full flex flex-col items-center'>
      {(key) => {
        switch (key) {
          case 'success':
            return (
              <>
                <MailCheckIcon className='size-32 sm:size-44 stroke-1 text-primary' />

                <p className='mt-6 font-light sm:text-lg xs:w-3/4 sm:w-96 text-center'>
                  Congratulations ! Your account has been confirmed successfully
                  confirmed&nbsp;!
                </p>

                <p className='mt-5 flex items-center space-x-2 text-gray-500 font-light sm:text-lg'>
                  <span>Redirecting</span>

                  <Loader2Icon className='w-[1em] mt-1 animate-spin' />
                </p>
              </>
            );
          case 'error':
            return (
              <>
                <AlertCircleIcon className='size-32 sm:size-44 text-red-400 stroke-1' />

                <p className='mt-6 font-light text-lg'>
                  Ops, something went wrong..
                </p>

                <Button
                  className='text-base mt-5 sm:mt-10'
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
                <Loader2Icon className='size-32 sm:size-44 animate-spin stroke-1 text-slate-600' />

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
