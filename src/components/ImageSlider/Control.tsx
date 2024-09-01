'use client';
import { ChevronRightIcon } from 'lucide-react';

import type { DefineProps } from '@/types';
import { cn } from '@/lib/utils/cn';

export type ImageSliderControl = DefineProps<
  {
    isRight?: boolean;
  },
  HTMLButtonElement
>;

export const ImageSliderControl = ({
  isRight = false,
  className,
  ...attrs
}: ImageSliderControl) => {
  return (
    <button
      {...attrs}
      className={cn(
        'flex size-9 cursor-pointer items-center justify-center rounded-full bg-slate-200 text-gray-700',
        {
          'rotate-180': !isRight,
        },
        className,
      )}
    >
      <ChevronRightIcon className={cn('size-1/2')} />
    </button>
  );
};
