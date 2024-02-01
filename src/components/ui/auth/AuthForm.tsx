'use client';

import { HTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/lib/utils/cn';
import {
  type UserCredentialsDto,
  UserCredentialsDtoSchema,
} from '#server/dtos/auth';

import { Input } from '../Input';
import { Button } from '../Button';

export interface AuthFormAttributes
  extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  onSubmit: (userCredentials: UserCredentialsDto) => any;
  submitButtonText: string;
}

export function AuthForm({
  className,
  onSubmit: onSuccessValidation,
  submitButtonText,
}: AuthFormAttributes) {
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

  const onSubmit = handleSubmit(onSuccessValidation);

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

      <Button className='text-base' type='submit' pending={isSubmitting}>
        {submitButtonText}
      </Button>
    </form>
  );
}
