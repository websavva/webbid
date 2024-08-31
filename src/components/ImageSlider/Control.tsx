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
        'size-9 flex justify-center items-center cursor-pointer bg-slate-200 text-gray-700 rounded-full',
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
