'use client';

import { HTMLAttributes, ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/lib/utils/cn';
import {
  type UserCredentialsDto,
  UserCredentialsDtoSchema,
} from '#server/dtos/auth';

import { Input } from '../Input';
import { PasswordInput } from '../PasswordInput';
import { Button } from '../Button';

export interface AuthFormAttributes
  extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  onSubmit: (userCredentials: UserCredentialsDto) => any;
  submitButtonText: string;
  selectedFields?: Array<keyof UserCredentialsDto>;
}

export function AuthForm({
  className,
  onSubmit: onSuccessValidation,
  submitButtonText,
  selectedFields = ['email', 'password'],
}: AuthFormAttributes) {
  const defaultValues = Object.fromEntries(
    selectedFields.map((fieldName) => [fieldName, ''])
  ) as UserCredentialsDto;

  const resolverPickMap = Object.fromEntries(
    selectedFields.map((fieldName) => [fieldName, true])
  ) as Record<keyof UserCredentialsDto, true>;
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UserCredentialsDto>({
    defaultValues,

    resolver: zodResolver(UserCredentialsDtoSchema.pick(resolverPickMap)),
  });

  const onSubmit = handleSubmit(onSuccessValidation);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const AuthInputs: Record<keyof UserCredentialsDto, () => ReactNode> = {
    email: () => <Input control={control} name='email' placeholder='Email' />,

    password: () => (
      <PasswordInput control={control} name='password' placeholder='Password' />
    ),
  };

  const selectedAuthInputs = Object.entries(AuthInputs)
    .filter(([fieldName]) => selectedFields.includes(fieldName as any))
    .map(([fieldName, AuthInput]) => <AuthInput key={fieldName} />);

  return (
    <form
      className={cn('flex flex-col space-y-6', className)}
      onSubmit={onSubmit}
    >
      {selectedAuthInputs}

      <Button className='text-base' type='submit' pending={isSubmitting}>
        {submitButtonText}
      </Button>
    </form>
  );
}
