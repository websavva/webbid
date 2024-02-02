import { toArray } from '@/lib/utils/to-array';
import type { PagePropsWithSearchParams } from '@/types/page-props';
import { EmailEnvelopeIcon } from '@/components/ui/icons/EmailEnvelope';

export default function SignUpVerifyPage({
  searchParams: { email: rawEmail },
}: PagePropsWithSearchParams<'email'>) {
  const email = rawEmail ? toArray(rawEmail)[0] : '';

  return (
    <div className='flex flex-col items-center py-20'>
      <EmailEnvelopeIcon className='w-52 h-52' />

      <h1 className='mt-10 text-3xl text-gray-600 font-bold'>
        Check your email
      </h1>

      <p className='mt-5 text-base text-gray-500 text-center'>
        We've sent a verification link to{' '}
        <strong className='font-bold'>{email || 'your email'}</strong>
      </p>
    </div>
  );
}
