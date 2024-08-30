'use client';

import './globals.css';
import Layout from '@/components/UI/Layout';
import { ErrorFrame } from '@/components/UI/ErrorFrame';
import { Logo } from '@/components/UI/Logo';
import { publicEnv } from '@/server/env/public';

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Layout>
      <div className='flex w-full max-sm:justify-center items-center px-16 py-5 bg-gray-100 border-b-2 border-gray-200 tracking-wider font-semibold text-gray-700 text-xl sm:text-2xl'>
        <Logo className='size-[2em] mr-5'/>

        <span>{publicEnv.COMPANY_NAME}</span>
      </div>

      <ErrorFrame message='Hello World'>
        <button
          className='block mx-auto text-sm mt-5 py-2 px-5 rounded-lg bg-blue-600 text-white'
          onClick={() => window.location.reload()}
        >
          Reload page
        </button>
      </ErrorFrame>
    </Layout>
  );
}
