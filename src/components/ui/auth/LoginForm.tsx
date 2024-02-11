'use client';

import { toast } from 'sonner';
import flatry from 'await-to-js';
import { useAuth } from '@/hooks/use-auth';

import { trpcClient } from '@/lib/trpc';
import { DefineProps } from '@/types';
import { useRouter } from 'next/navigation';
import type { UserCredentialsDto } from '#server/dtos/auth';

import { AuthForm } from './AuthForm';

export function LoginForm({ className }: DefineProps<{}>) {
  const router = useRouter();
  const { login } = useAuth();

  const onSubmit = async (userCredentials: UserCredentialsDto) => {
    const [err] = await flatry(login(userCredentials));

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
