import { useState, type ForwardRefExoticComponent } from 'react';
import Image from 'next/image';
import { Loader2Icon } from 'lucide-react';

import { cn } from '@/lib/utils/cn';

type ImageProps =
  typeof Image extends ForwardRefExoticComponent<infer P> ? P : never;

export interface LoadableImageProps
  extends Pick<ImageProps, 'width' | 'height' | 'className' | 'alt' | 'src'> {
  imageClassName?: string;
}

export function LoadableImage({
  width,
  height,
  className,
  alt,
  src,
  imageClassName,
}: LoadableImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const onLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className={cn(className, 'grid grid-cols-[100%] grid-rows-[100%]')}>
      {!isLoaded && (
        <div className='col-span-full row-span-full flex size-full items-center justify-center'>
          <Loader2Icon className='size-1/5 animate-spin' />
        </div>
      )}

      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading='lazy'
        className={cn(
          'col-span-full row-span-full size-full transition-opacity',
          {
            'opacity-0': !isLoaded,
          },
          imageClassName,
        )}
        onLoadingComplete={() => onLoad()}
      />
    </div>
  );
}
