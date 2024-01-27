'use client';

import { forwardRef, useRef } from 'react';
import { type UseControllerProps, useController } from 'react-hook-form';

import { mergeRefs } from '@/lib/utils/merge-refs';
import { cn } from '@/lib/utils/cn';

import { TransitionHeight } from './TransitionHeight';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  UseControllerProps;

const Input = forwardRef(
  (
    { className, type, ...props }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const {
      field,
      fieldState: { invalid, error: { message: errorMessage } = {} },
      formState: {
        isSubmitting,
      }
    } = useController(props);

    const errorElementRef = useRef<HTMLDivElement>(null)

    return (
      <div>
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-slate-300 bg-background px-3 py-6 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-100',
            className,
            {
              'border-red-500': invalid,
            }
          )}
          disabled={isSubmitting}
          {...props}
          {...field}
          ref={mergeRefs([ref, field.ref])}
        />
        <TransitionHeight in={invalid} nodeRef={errorElementRef}>
          <div ref={errorElementRef} className='text-xs text-red-500 mt-2 transition-all'>
            {errorMessage}
          </div>
        </TransitionHeight>
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
