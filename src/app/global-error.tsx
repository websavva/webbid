'use client';

import './globals.css';
import Layout from '@/components/UI/Layout';
import { ErrorFrame } from '@/components/UI/ErrorFrame';
import { Logo } from '@/components/UI/Logo';
import { publicEnv } from '#server/env/public';

export default function GlobalErrorPage({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Layout>
      <div className='flex w-full items-center border-b-2 border-gray-200 bg-gray-100 px-16 py-5 text-xl font-semibold tracking-wider text-gray-700 max-sm:justify-center sm:text-2xl'>
        <Logo className='mr-5 size-[2em]' />

        <span>{publicEnv.COMPANY_NAME}</span>
      </div>

      <ErrorFrame message={error.message}>
        <button
          className='mx-auto mt-5 block rounded-lg bg-blue-600 px-5 py-2 text-sm text-white'
          onClick={() => window.location.reload()}
        >
          Reload page
        </button>
      </ErrorFrame>
    </Layout>
  );
}
