'use client';

import { forwardRef, useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

import { cn } from '@/lib/utils/cn';

import { type InputProps, Input } from './Input';

const PasswordInput = forwardRef(
  (
    { className, ...props }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const PasswordInputIcon = isPasswordVisible ? EyeOffIcon : EyeIcon;

    return (
      <Input
        placeholder='Password'
        {...props}
        type={isPasswordVisible ? 'text' : 'password'}
        ref={ref}
        Icon={
          <PasswordInputIcon
            className='absolute right-4 top-1/2 size-[1.1em] -translate-y-1/2 cursor-pointer'
            onClick={() => setIsPasswordVisible((isVisible) => !isVisible)}
          />
        }
        className={cn('pr-10', className)}
      />
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
