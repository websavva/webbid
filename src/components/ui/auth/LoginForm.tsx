'use client';

import { toast } from 'sonner';
import flatry from 'await-to-js';
import { withQuery } from 'ufo';

import { trpcClient } from '@/lib/trpc';
import { DefineProps } from '@/types';
import { useRouter } from 'next/navigation';
import type { UserCredentialsDto } from '#server/dtos/auth';

import { AuthForm } from './AuthForm';

export function LoginForm({ className }: DefineProps<{}>) {
  const router = useRouter();

  const onSubmit = async (userCredentials: UserCredentialsDto) => {
    const [err, { user = null } = {}] = await flatry(
      trpcClient.auth.login.mutate(userCredentials)
    );

    if (err)
      return toast.error(err.message, {
        closeButton: true,
      });

    await router.push('/');
  };

  return (
    <AuthForm
      submitButtonText='Login'
      onSubmit={onSubmit}
      className={className}
    />
  );
}
