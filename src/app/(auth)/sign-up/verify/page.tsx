import { toArray } from '@/lib/utils/to-array';
import type { PagePropsWithSearchParams } from '@/types/page-props';
import { EmailEnvelopeIcon } from '@/components/icons/EmailEnvelope';

export default function SignUpVerifyPage({
  searchParams: { email: rawEmail },
}: PagePropsWithSearchParams<'email'>) {
  const [email] = toArray(rawEmail);

  return (
    <>
      <EmailEnvelopeIcon className='w-52 h-52' />

      <h1 className='mt-10 text-3xl text-gray-600 font-bold'>
        Check your email
      </h1>

      <p className='mt-5 text-base text-gray-500 text-center'>
        We&apos;ve sent a verification link to{' '}
        <strong className='font-bold'>{email || 'your email'}</strong>
      </p>
    </>
  );
}
