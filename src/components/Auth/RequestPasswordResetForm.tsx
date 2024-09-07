'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { useApi } from '@/hooks/use-api';
import { trpcClient } from '@/lib/trpc';
import type { UserCredentialsDto } from '#server/dtos/auth';
import { AuthFormFrame } from '@/components/AuthFormFrame';

import TransitionFade from '../UI/TransitionFade';
import { SentEmailIcon } from '../Icons/SentEmailIcon';

import { AuthForm } from './AuthForm';

export const RequestPasswordResetForm = () => {
  const [email, setEmail] = useState<string | null>(null);

  const { makeApiCall, status } = useApi(
    ({ email }: UserCredentialsDto) => {
      return trpcClient.auth.requestPasswordReset.mutate({ email });
    },
    {
      onError: (err) =>
        toast.error(err.message || 'Request of password reset has failed !', {
          dismissible: true,
        }),

      onSuccess: ({ email }) => setEmail(email),
    },
  );

  return (
    <TransitionFade transitionKey={status} className='w-full'>
      {(status) => {
        if (status === 'success') {
          return (
            <div className='flex flex-col items-center'>
              <SentEmailIcon className='size-80 sm:size-96 lg:size-[500px]' />

              <div className='mt-5 w-4/5 text-center font-semibold leading-relaxed text-gray-700 sm:w-3/5 sm:text-lg'>
                Letter with password reset instruction was sent{' '}
                {email && (
                  <span>
                    to your email <span className='text-primary'>{email}</span>{' '}
                  </span>
                )}
              </div>
            </div>
          );
        } else {
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
        }
      }}
    </TransitionFade>
  );
};
