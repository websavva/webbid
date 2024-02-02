'use client';

import { toast } from 'sonner';
import flatry from 'await-to-js';

import { trpcClient } from '@/lib/trpc';
import { DefineProps } from '@/types';
import type { UserCredentialsDto } from '#server/dtos/auth';

import { AuthForm } from './AuthForm';
import { cn } from '@/lib/utils/cn';

export function SignUpForm({ className }: DefineProps<{}>) {
  const onSubmit = async (userCredentials: UserCredentialsDto) => {
    const [err, { user = null } = {}] = await flatry(
      trpcClient.auth.signUp.mutate(userCredentials)
    );

    if (err)
      return toast.error(err.message, {
        duration: 20e3,
      });

    const { email } = user!;

    console.log({
      email,
    });
  };

  return (
    <AuthForm
      submitButtonText='Sign up'
      onSubmit={onSubmit}
      className={className}
    />
  );
}
