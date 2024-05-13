import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useApi } from '@/hooks/use-api';
import { trpcClient } from '@/lib/trpc';
import { UserCredentialsDto } from '@/server/dtos/auth';

import { AuthForm } from './AuthForm';

export const RequestResetPasswordForm = () => {
  const {} = useApi(
    ({ email }: UserCredentialsDto) =>
      trpcClient.auth.requestPasswordReset.mutate(email),
    {
      onError: (err) =>
        toast.error(err.message || 'Request of password reset has failed !', {
          dismissible: true,
        }),

      onSuccess: () => {},
    }
  );

  return <AuthForm submitButtonText='Submit' selectedFields={['email']} />;
};
