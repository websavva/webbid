'use client';

import type { ReactNode } from 'react';
import { forwardRef, useRef } from 'react';
import {
  type UseControllerProps,
  useController,
  type Control,
} from 'react-hook-form';

import { mergeRefs } from '@/lib/utils/merge-refs';
import { cn } from '@/lib/utils/cn';

import { TransitionHeight } from './TransitionHeight';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  Omit<UseControllerProps, 'control'> & {
    control: Control<any>;
    Icon?: ReactNode;
  };

const Input = forwardRef(
  (
    { className, type, Icon, ...props }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const {
      field,
      fieldState: { invalid, error: { message: errorMessage } = {} },
      formState: { isSubmitting },
    } = useController(props);

    const errorElementRef = useRef<HTMLDivElement>(null);

    return (
      <div>
        <div className='relative'>
          <input
            type={type}
            className={cn(
              'flex h-10 w-full rounded-md border border-slate-300 bg-background px-3 py-6 ring-offset-background transition-all duration-100 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              className,
              {
                'border-red-500': invalid,
              },
            )}
            disabled={isSubmitting}
            {...props}
            {...field}
            ref={mergeRefs([ref, field.ref])}
          />

          {Icon}
        </div>
        <TransitionHeight in={invalid} nodeRef={errorElementRef}>
          <div
            ref={errorElementRef}
            className='mt-2 text-xs text-red-500 transition-all'
          >
            {errorMessage}
          </div>
        </TransitionHeight>
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
