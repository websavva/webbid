'use client';

import { cn } from '@/lib/utils/cn';
import type { DefineProps } from '@/types';

export type ImageSliderPaginationProps = DefineProps<
  {
    currentSlideIndex: number;
    slidesCount: number;
    dotClass?: string;
    onSlideChange: (slideIndex: number) => any;
  },
  HTMLDivElement
>;

export const ImageSliderPagination = ({
  currentSlideIndex,
  slidesCount,
  onSlideChange,
  className,
  dotClass = '',
  ...attrs
}: ImageSliderPaginationProps) => {
  return (
    <div {...attrs} className={cn('flex items-center space-x-3', className)}>
      {[...Array(slidesCount).keys()].map((slideIndex) => {
        const isActive = slideIndex === currentSlideIndex;

        return (
          <button
            key={slideIndex}
            className={cn(
              'size-3 rounded-full bg-gray-600 hover:bg-slate-200 transition-all cursor-pointer',
              {
                'bg-gray-200': isActive,
              },
              dotClass
            )}
            onClick={() => !isActive && onSlideChange(slideIndex)}
          />
        );
      })}
    </div>
  );
};
