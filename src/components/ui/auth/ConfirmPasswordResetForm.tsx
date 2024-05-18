'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useApi } from '@/hooks/use-api';
import { trpcClient } from '@/lib/trpc';
import type { DefineProps } from '@/types';
import type { UserCredentialsDto } from '#server/dtos/auth';

import { SentEmailIcon } from '../icons/SentEmailIcon';
import { AuthForm } from './AuthForm';
import { useAuth } from '@/hooks/use-auth';

export type ConfirmPasswordResetFormProps = DefineProps<{
  token: string;
}>;

export const ConfirmPasswordResetForm = ({
  token,
}: ConfirmPasswordResetFormProps) => {
  const router = useRouter();
  const { setAuthInfo } = useAuth();

  const { isSuccess, makeApiCall } = useApi(
    ({ password }: UserCredentialsDto) => {
      return trpcClient.auth.resetPassword.mutate({ password, token });
    },
    {
      onError: (err) =>
        toast.error(err.message || 'Request of password reset has failed !', {
          dismissible: true,
        }),

      onSuccess: (authInfo) => {
        setAuthInfo(authInfo as any);

        router.push('/profile');
      },
    }
  );

  if (isSuccess)
    return (
      <div className='flex flex-col items-center'>
        <SentEmailIcon className='size-[500px]' />

        <div className='mt-5 font-semibold text-lg w-3/5 leading-relaxed text-center text-gray-700'>
          Letter with password reset instruction was sent{' '}
          {email && (
            <span>
              to your email <span className='text-primary'>{email}</span>{' '}
            </span>
          )}
        </div>
      </div>
    );

  return (
    <AuthForm
      submitButtonText='Submit'
      selectedFields={['password']}
      onSubmit={makeApiCall}
    />
  );
};
