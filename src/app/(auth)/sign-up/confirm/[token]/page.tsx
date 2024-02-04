'use client';

import { Loader2Icon, AlertCircleIcon } from 'lucide-react';

import type { PagePropsWithParams } from '@/types/page-props';
import { Button } from '@/components/ui/Button';

export default function SignUpVerifyPage({
  params: { token },
}: PagePropsWithParams<{
  token: string;
}>) {
  let isLoading = false;

  return (
    <div className='py-20'>
      {isLoading && (
        <div className='flex flex-col items-center'>
          <Loader2Icon className='size-44 animate-spin stroke-1 text-slate-600' />

          <span className='mt-6 font-light text-lg'>
            Confirming your account...
          </span>
        </div>
      )}
      {!isLoading && (
        <div className='flex flex-col items-center'>
          <AlertCircleIcon className='size-44 text-red-400 stroke-1' />

          <span className='mt-6 font-light text-lg'>
            Ops, something went wrong..
          </span>

          <Button className='text-base mt-10' variant={'secondary'}>
            Try again
          </Button>
        </div>
      )}
    </div>
  );
}
