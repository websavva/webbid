import type { Metadata } from 'next';

import { toArray } from '@/lib/utils/to-array';
import type { PagePropsWithSearchParams } from '@/types/page-props';
import { EmailEnvelopeIcon } from '@/components/Icons/EmailEnvelope';

export const metadata: Metadata = {
  title: 'Registration Verification',
};

export const middlewares = ['guest'];

export default function SignUpVerifyPage({
  searchParams: { email: rawEmail },
}: PagePropsWithSearchParams<'email'>) {
  const [email] = toArray(rawEmail);

  return (
    <>
      <EmailEnvelopeIcon className='size-32 sm:size-52' />

      <h1 className='mt-8 text-2xl font-bold text-gray-600 sm:mt-10 sm:text-3xl'>
        Check your email
      </h1>

      <p className='mt-3 text-center text-base text-gray-500 sm:mt-5'>
        We&apos;ve sent a verification link to{' '}
        <strong className='font-bold'>{email || 'your email'}</strong>
      </p>
    </>
  );
}
