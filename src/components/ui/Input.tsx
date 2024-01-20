'use client';

import * as React from 'react';
import { type UseControllerProps, useController } from 'react-hook-form';

import { mergeRefs } from '@/lib/utils/merge-refs';
import { cn } from '@/lib/utils/cn';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  UseControllerProps;

const Input = React.forwardRef(
  (
    { className, type, ...props }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const { field, fieldState } = useController(props);

    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-slate-300 bg-background px-3 py-6 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-100',
          className,
          {
            'border-red-500': fieldState.invalid,
          }
        )}
        {...props}
        {...field}
        ref={mergeRefs([ref, field.ref])}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
