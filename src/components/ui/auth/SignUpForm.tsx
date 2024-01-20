'use client';

import { HTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/lib/utils/cn';
import { type SignUpUserDto, SignUpUserDtoSchema } from '@/server/dtos/auth';

import { Input } from '../Input';
import { Button } from '../Button';

export interface SignUpFormAttributes extends HTMLAttributes<HTMLFormElement> {}

export function SignUpForm({ className }: SignUpFormAttributes) {
  const { control, reset, handleSubmit } = useForm<SignUpUserDto>({
    defaultValues: {
      email: '',
      password: '',
    },

    resolver: zodResolver(SignUpUserDtoSchema),
  });

  return (
    <form className={cn('flex flex-col space-y-6', className)}>
      <Input control={control} name='email' placeholder='Email' />

      <Button className='text-base' type='submit'>
        Sign Up
      </Button>
    </form>
  );
}
