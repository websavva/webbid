'use client';

import * as React from 'react';
import * as SelectCorePrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

import { cn } from '@/lib/utils/cn';

const SelectCore = SelectCorePrimitive.Root;

const SelectCoreGroup = SelectCorePrimitive.Group;

const SelectCoreValue = SelectCorePrimitive.Value;

const SelectCoreTrigger = React.forwardRef<
  React.ElementRef<typeof SelectCorePrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectCorePrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectCorePrimitive.Trigger
    ref={ref}
    className={cn(
      'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
      className
    )}
    {...props}
  >
    {children}
    <SelectCorePrimitive.Icon asChild>
      <ChevronDown className='h-4 w-4 opacity-50' />
    </SelectCorePrimitive.Icon>
  </SelectCorePrimitive.Trigger>
));
SelectCoreTrigger.displayName = SelectCorePrimitive.Trigger.displayName;

const SelectCoreScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectCorePrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectCorePrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectCorePrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className
    )}
    {...props}
  >
    <ChevronUp className='h-4 w-4' />
  </SelectCorePrimitive.ScrollUpButton>
));
SelectCoreScrollUpButton.displayName = SelectCorePrimitive.ScrollUpButton.displayName;

const SelectCoreScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectCorePrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectCorePrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectCorePrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className
    )}
    {...props}
  >
    <ChevronDown className='h-4 w-4' />
  </SelectCorePrimitive.ScrollDownButton>
));
SelectCoreScrollDownButton.displayName =
  SelectCorePrimitive.ScrollDownButton.displayName;

const SelectCoreContent = React.forwardRef<
  React.ElementRef<typeof SelectCorePrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectCorePrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectCorePrimitive.Portal>
    <SelectCorePrimitive.Content
      ref={ref}
      className={cn(
        'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className
      )}
      position={position}
      {...props}
    >
      <SelectCoreScrollUpButton />
      <SelectCorePrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </SelectCorePrimitive.Viewport>
      <SelectCoreScrollDownButton />
    </SelectCorePrimitive.Content>
  </SelectCorePrimitive.Portal>
));
SelectCoreContent.displayName = SelectCorePrimitive.Content.displayName;

const SelectCoreLabel = React.forwardRef<
  React.ElementRef<typeof SelectCorePrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectCorePrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectCorePrimitive.Label
    ref={ref}
    className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
    {...props}
  />
));
SelectCoreLabel.displayName = SelectCorePrimitive.Label.displayName;

const SelectCoreItem = React.forwardRef<
  React.ElementRef<typeof SelectCorePrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectCorePrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectCorePrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
      <SelectCorePrimitive.ItemIndicator>
        <Check className='h-4 w-4' />
      </SelectCorePrimitive.ItemIndicator>
    </span>

    <SelectCorePrimitive.ItemText>{children}</SelectCorePrimitive.ItemText>
  </SelectCorePrimitive.Item>
));
SelectCoreItem.displayName = SelectCorePrimitive.Item.displayName;

const SelectCoreSeparator = React.forwardRef<
  React.ElementRef<typeof SelectCorePrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectCorePrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectCorePrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));
SelectCoreSeparator.displayName = SelectCorePrimitive.Separator.displayName;

export {
  SelectCore,
  SelectCoreGroup,
  SelectCoreValue,
  SelectCoreTrigger,
  SelectCoreContent,
  SelectCoreLabel,
  SelectCoreItem,
  SelectCoreSeparator,
  SelectCoreScrollUpButton,
  SelectCoreScrollDownButton,
};
