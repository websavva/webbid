'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { useApi } from '@/hooks/use-api';
import { trpcClient } from '@/lib/trpc';
import { UserCredentialsDto } from '#server/dtos/auth';
import { AuthFormFrame } from '@/components/AuthFormFrame';

import { SentEmailIcon } from '../Icons/SentEmailIcon';

import { AuthForm } from './AuthForm';

export const RequestPasswordResetForm = () => {
  const [email, setEmail] = useState<string | null>(null);

  const { isSuccess, makeApiCall } = useApi(
    ({ email }: UserCredentialsDto) => {
      return trpcClient.auth.requestPasswordReset.mutate({ email });
    },
    {
      onError: (err) =>
        toast.error(err.message || 'Request of password reset has failed !', {
          dismissible: true,
        }),

      onSuccess: ({ email }) => setEmail(email),
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
    <AuthFormFrame
      linkHref='/sign-up'
      linkText="Don't have an account ? Sign Up"
      heading='Password Reset'
    >
      <AuthForm
        submitButtonText='Submit'
        selectedFields={['email']}
        onSubmit={makeApiCall}
      />
    </AuthFormFrame>
  );
};
