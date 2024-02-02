'use client';

import { toast } from 'sonner';
import flatry from 'await-to-js';
import { withQuery } from 'ufo';

import { trpcClient } from '@/lib/trpc';
import { DefineProps } from '@/types';
import { useRouter } from 'next/navigation';
import type { UserCredentialsDto } from '#server/dtos/auth';

import { AuthForm } from './AuthForm';
import { cn } from '@/lib/utils/cn';

export function SignUpForm({ className }: DefineProps<{}>) {
  const router = useRouter();

  const onSubmit = async (userCredentials: UserCredentialsDto) => {
    const [err, { user = null } = {}] = await flatry(
      trpcClient.auth.signUp.mutate(userCredentials)
    );

    if (err)
      return toast.warning(err.message, {
        closeButton: true,
      });

    const { email } = user!;

    await router.push(
      withQuery('/sign-up/verify', {
        email,
      })
    );
  };

  return (
    <AuthForm
      submitButtonText='Sign up'
      onSubmit={onSubmit}
      className={className}
    />
  );
}
