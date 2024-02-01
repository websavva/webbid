'use client';

import { trpcClient } from '@/lib/trpc';
import { DefineProps } from '@/types';
import type { UserCredentialsDto } from '#server/dtos/auth';

import { AuthForm } from './AuthForm';

export function SignUpForm({ className }: DefineProps<{}>) {
  const onSubmit = async (userCredentials: UserCredentialsDto) => {
    await trpcClient.auth.signUp.mutate(userCredentials);
  };

  return (
    <AuthForm
      submitButtonText='Sign up'
      onSubmit={onSubmit}
      className={className}
    />
  );
}
