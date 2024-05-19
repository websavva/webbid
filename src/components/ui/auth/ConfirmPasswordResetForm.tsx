'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useApi } from '@/hooks/use-api';
import { trpcClient } from '@/lib/trpc';
import type { DefineProps } from '@/types';
import type { UserCredentialsDto } from '#server/dtos/auth';
import { PasswordSecurityIcon } from '@/components/ui/icons/PasswordSecurityIcon';

import { AuthForm } from './AuthForm';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils/cn';

export type ConfirmPasswordResetFormProps = DefineProps<{
  token: string;
}>;

export const ConfirmPasswordResetForm = ({
  token,
  className,
  ...attrs
}: ConfirmPasswordResetFormProps) => {
  const router = useRouter();
  const { setAuthInfo } = useAuth();

  const { makeApiCall } = useApi(
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

        toast.success('Your password has changed successfully !');

        router.push('/');
      },
    }
  );

  return (
    <div {...attrs} className={cn('', className)}>
      <PasswordSecurityIcon className='mb-10 mx-auto' />

      <AuthForm
        submitButtonText='Save Password'
        selectedFields={['password']}
        onSubmit={makeApiCall}
        className={className}
      />
    </div>
  );
};
