'use client';

import type { z } from 'zod';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { toast } from 'sonner';

import type { DefineProps } from '@/types';

import { ChangePasswordDtoSchema, passwordSchema } from '#server/dtos/auth';
import { trpcClient } from '@/lib/trpc';
import { useAuth } from '@/hooks/use-auth';
import { useApi } from '@/hooks/use-api';
import { cn } from '@/lib/utils/cn';
import type { AuthInfo } from '@/contexts/auth/context';

import { PasswordInput } from '../UI/PasswordInput';
import { Button } from '../UI/Button';

export type ChangePasswordFormProps = DefineProps<{}, HTMLFormElement>;

const ChangePasswordFormSchema = ChangePasswordDtoSchema.extend({
  newPasswordConfirmation: passwordSchema(),
})
  .refine(
    ({ newPassword, newPasswordConfirmation }) => {
      return newPassword === newPasswordConfirmation;
    },
    {
      path: ['newPasswordConfirmation'],
      message: 'Passwords should be the same',
    },
  )
  .refine(
    ({ password: oldPassword, newPassword }) => newPassword !== oldPassword,
    {
      path: ['newPassword'],
      message: 'New password should differ from the old one',
    },
  );

type ChangePasswordFormData = z.infer<typeof ChangePasswordFormSchema>;

export const ChangePasswordForm = ({
  className,
  ...attrs
}: ChangePasswordFormProps) => {
  const { setAuthInfo } = useAuth();

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<ChangePasswordFormData>({
    defaultValues: {
      password: '',
      newPassword: '',
      newPasswordConfirmation: '',
    },

    resolver: zodResolver(ChangePasswordFormSchema),
  });

  const {
    makeApiCall: sendChangePasswordRequest,
    isPending: isRequestPending,
  } = useApi(
    ({ password, newPassword }: ChangePasswordFormData) => {
      return trpcClient.auth.changePassword.mutate({
        password,
        newPassword,
      });
    },
    {
      onSuccess: ({ user }) => {
        setAuthInfo({
          user,
        } as unknown as AuthInfo);

        toast.success('Password has been changed !');
        reset();
      },

      onError: (err) =>
        toast.error(err.message || 'Password change has failed !'),
    },
  );

  const pending = isSubmitting || isRequestPending;

  const onSubmit = handleSubmit((form) => sendChangePasswordRequest(form));

  return (
    <form
      {...attrs}
      onSubmit={onSubmit}
      className={cn('flex flex-col', className)}
    >
      <PasswordInput
        control={control}
        name='password'
        placeholder='Current password'
        disabled={pending}
      />

      <PasswordInput
        control={control}
        name='newPassword'
        placeholder='New password'
        disabled={pending}
        className='mt-3'
      />

      <PasswordInput
        control={control}
        name='newPasswordConfirmation'
        placeholder='Confirm new password'
        disabled={pending}
        className='mt-3'
      />

      <Button
        size={'lg'}
        type='submit'
        pending={pending}
        className='mt-5 self-start text-base'
      >
        Save
      </Button>
    </form>
  );
};
