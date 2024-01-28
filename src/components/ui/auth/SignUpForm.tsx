'use client';

import { HTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/lib/utils/cn';
import { type UserCredentialsDto, UserCredentialsDtoSchema } from '#server/dtos/auth';
import { trpcClient } from '@/lib/trpc';

import { Input } from '../Input';
import { Button } from '../Button';

export interface SignUpFormAttributes extends HTMLAttributes<HTMLFormElement> {}

export function SignUpForm({ className }: SignUpFormAttributes) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UserCredentialsDto>({
    defaultValues: {
      email: '',
      password: '',
    },

    resolver: zodResolver(UserCredentialsDtoSchema),
  });

  const onSubmit = handleSubmit(async (userCredentialsDto) => {
    await trpcClient.auth.signUp.mutate(userCredentialsDto);
  });

  return (
    <form
      className={cn('flex flex-col space-y-6', className)}
      onSubmit={onSubmit}
    >
      <Input control={control} name='email' placeholder='Email' />

      <Input
        control={control}
        name='password'
        type='password'
        placeholder='Password'
      />

      <Button className='text-base' type='submit' disabled={isSubmitting}>
        Sign Up
      </Button>
    </form>
  );
}
