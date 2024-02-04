'use client';
import { useRouter } from 'next/router';

import { Loader2Icon, AlertCircleIcon } from 'lucide-react';

import type { PagePropsWithParams } from '@/types/page-props';

export default function SignUpVerifyPage({
  params: { token },
}: PagePropsWithParams<{
  token: string;
}>) {
  return (
    <div className='py-20'>
      {/* <div className='flex flex-col items-center'>
        <Loader2Icon className='size-44 animate-spin stroke-1 text-slate-600' />

        <span className='mt-6 font-light text-lg'>
          Confirming your account...
        </span>
      </div> */}

      <div className='flex flex-col items-center'>
        <AlertCircleIcon className='size-44 text-gray-500 stroke-1'/>
      </div>
    </div>
  );
}
