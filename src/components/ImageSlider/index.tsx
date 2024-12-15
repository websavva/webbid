'use client';

import { useState, useCallback, useRef } from 'react';

import { cn } from '@/lib/utils/cn';
import type { DefineProps } from '@/types';
import { useSwipe, type UseSwipeDirection } from '@/hooks/use-swipe';

import { LoadableImage } from '../UI/LoadableImage';

import { ImageSliderControl } from './Control';
import { ImageSliderPagination } from './Pagination';

export type ImageSliderProps = DefineProps<
  {
    imageUrls: string[];
    paginationDotClass?: string;
    controlClass?: string;
    paginationClass?: string;
  },
  HTMLDivElement
>;

export const ImageSlider = ({
  imageUrls,
  className,
  controlClass = '',
  paginationClass = '',
  paginationDotClass = '',
  ...attrs
}: ImageSliderProps) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const slidesCount = imageUrls.length;

  const isLastSlide = currentSlideIndex === slidesCount - 1;
  const isFirstSlide = currentSlideIndex === 0;

  const switchToSlide = useCallback(
    (slideIndex = 0) => {
      setCurrentSlideIndex(slideIndex);
    },
    [setCurrentSlideIndex],
  );

  const toNextSlide = useCallback(() => {
    if (isLastSlide) return;

    setCurrentSlideIndex((currentSlide) => currentSlide + 1);
  }, [isLastSlide, setCurrentSlideIndex]);

  const toPrevSlide = useCallback(() => {
    if (isFirstSlide) return;

    setCurrentSlideIndex((currentSlide) => currentSlide - 1);
  }, [isFirstSlide, setCurrentSlideIndex]);

  const viewStyle = {
    transform: `translateX(-${currentSlideIndex * 100}%)`,
  };

  const rootElementRef = useRef<HTMLDivElement>(null);

  const onSwipeEnd = useCallback(
    (_: TouchEvent, direction: UseSwipeDirection) => {
      if (direction == 'left') toNextSlide();
      else if (direction == 'right') toPrevSlide();
    },
    [toPrevSlide, toNextSlide],
  );

  useSwipe(rootElementRef, {
    onSwipeEnd,
  });

  return (
    <div
      {...attrs}
      ref={rootElementRef}
      className={cn(
        'group relative select-none overflow-hidden rounded-2xl',
        className,
      )}
    >
      <div
        className='flex h-[inherit] w-full transition-transform'
        style={viewStyle}
      >
        {imageUrls.map((imageUrl, index) => {
          return (
            <LoadableImage
              src={imageUrl}
              alt=''
              width={1e3}
              height={1e3}
              key={`${imageUrl}${index}`}
              className='h-[inherit] w-full flex-[0_0_100%] bg-slate-200 text-gray-500'
              imageClassName='h-[inherit] object-cover'
            />
          );
        })}
      </div>

      <div className='absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 items-center px-3'>
        {!isFirstSlide && (
          <ImageSliderControl
            isRight={false}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              toPrevSlide();
            }}
            className={cn(
              'mr-auto transition-all hover:scale-110 group-hover:opacity-100 sm:opacity-0',
              controlClass,
            )}
          />
        )}

        {!isLastSlide && (
          <ImageSliderControl
            isRight
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              toNextSlide();
            }}
            className={cn(
              'ml-auto transition-all hover:scale-110 group-hover:opacity-100 sm:opacity-0',
              controlClass,
            )}
          />
        )}
      </div>

      <ImageSliderPagination
        className={cn(
          'absolute bottom-4 left-1/2 w-full -translate-x-1/2 justify-center',
          paginationClass,
        )}
        dotClass={paginationDotClass}
        slidesCount={slidesCount}
        currentSlideIndex={currentSlideIndex}
        onSlideChange={switchToSlide}
      />
    </div>
  );
};
