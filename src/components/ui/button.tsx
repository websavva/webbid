'use client';

import { useRef, forwardRef, type ButtonHTMLAttributes } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Loader2Icon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Transition } from 'react-transition-group';

import { cn } from '@/lib/utils/cn';
import { defineTransitionClasses } from '@/lib/utils/define-transition-classes';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-6 py-6 rounded-lg',
        sm: 'h-9 rounded-md px-4',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  pending?: boolean;
}

const PENDING_TRANSITION_CLASSES = defineTransitionClasses({
  entering: 'w-[1em] ml-2',
  entered: 'w-[1em] ml-2',
  exiting: 'w-0 ml-0',
  exited: 'w-0 ml-0',
  unmounted: 'w-0 ml-0',
});

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      pending = false,
      children,
      ...props
    },
    ref
  ) => {
    const componentProps = {
      className: cn(buttonVariants({ variant, size, className })),
      ref,
      ...props,
      disabled: props.disabled || pending,
    };

    const loaderRef = useRef<any>(null);

    if (asChild) {
      return <Slot {...componentProps}>{children}</Slot>;
    } else {
      return (
        <button {...componentProps}>
          {children}
          <Transition nodeRef={loaderRef} in={pending} timeout={200}>
            {(state) => (
              <Loader2Icon
                ref={loaderRef}
                className={cn(
                  'w-0 transition-all animate-spin',
                  PENDING_TRANSITION_CLASSES[state]
                )}
              />
            )}
          </Transition>
        </button>
      );
    }
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
