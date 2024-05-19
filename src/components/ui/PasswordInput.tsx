'use client';

import { forwardRef, useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

import { cn } from '@/lib/utils/cn';

import { type InputProps, Input } from './Input';

const PasswordInput = forwardRef(
  (
    { className, ...props }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const PasswordInputIcon = isPasswordVisible ? EyeOffIcon : EyeIcon;

    return (
      <div className='relative'>
        <Input
          placeholder='Password'
          {...props}
          type={isPasswordVisible ? 'text' : 'password'}
          ref={ref}
          className={cn('pr-10', className)}
        />

        {
          <PasswordInputIcon
            className='cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 size-[1.2em]'
            onClick={() => setIsPasswordVisible((isVisible) => !isVisible)}
          />
        }
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
