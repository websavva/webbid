'use client';
import { useState } from 'react';

import { cn } from '@/lib/utils/cn';
import type { DefineProps } from '@/types';

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

  function switchToSlide(slideIndex = 0) {
    setCurrentSlideIndex(slideIndex);
  }

  function toNextSlide() {
    if (isLastSlide) return;

    setCurrentSlideIndex((currentSlide) => currentSlide + 1);
  }

  function toPrevSlide() {
    if (isFirstSlide) return;

    setCurrentSlideIndex((currentSlide) => currentSlide - 1);
  }

  const viewStyle = {
    transform: `translateX(-${currentSlideIndex * 100}%)`,
  };

  return (
    <div
      {...attrs}
      className={cn(
        'overflow-hidden relative group rounded-2xl select-none',
        className
      )}
    >
      <div className='w-full flex transition-transform' style={viewStyle}>
        {imageUrls.map((imageUrl, index) => {
          return (
            <img
              key={`${imageUrl}${index}`}
              src={imageUrl}
              alt=''
              className='w-full h-auto'
            />
          );
        })}
      </div>

      <div className='flex items-center absolute w-full px-3 top-1/2 left-1/2 -translate-x-1/2'>
        {!isFirstSlide && (
          <ImageSliderControl
            isRight={false}
            onClick={toPrevSlide}
            className={cn(
              'opacity-0 mr-auto group-hover:opacity-100 transition-all hover:scale-110',
              controlClass
            )}
          />
        )}

        {!isLastSlide && (
          <ImageSliderControl
            isRight
            onClick={toNextSlide}
            className={cn(
              'opacity-0 ml-auto group-hover:opacity-100 transition-all hover:scale-110',
              controlClass
            )}
          />
        )}
      </div>

      <ImageSliderPagination
        className={cn(
          'absolute bottom-4 left-1/2 justify-center -translate-x-1/2 w-full',
          paginationClass
        )}
        dotClass={paginationDotClass}
        slidesCount={slidesCount}
        currentSlideIndex={currentSlideIndex}
        onSlideChange={switchToSlide}
      />
    </div>
  );
};
