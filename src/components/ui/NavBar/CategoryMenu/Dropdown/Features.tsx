'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Skeleton } from '@/components/ui/Skeleton';
import { trpcClient } from '@/lib/trpc';
import type { DefineProps } from '@/types';
import { cn } from '@/lib/utils/cn';

export type NavBarCategoryDropdownFeatures = DefineProps<{
  categoryId: number;
}>;

const FeaturesList = async ({ categoryId }: NavBarCategoryDropdownFeatures) => {
  const { docs: features } =
    await trpcClient.products.categories.getCategoryFeatures.query({
      perPage: 3,
      categoryId,
    });

  return (
    <>
      {features.map(({ name, href, image, externalImageUrl }) => {
        let derivedImageUrl: string | null = null;

        if (image && typeof image === 'object' && image.url) {
          derivedImageUrl = image?.url;
        } else if (externalImageUrl) {
          derivedImageUrl = externalImageUrl;
        }

        return (
          <li
            key={name}
            className='animate-in fade-in-0'
          >
            {derivedImageUrl && (
              <Image
                src={derivedImageUrl}
                alt=''
                objectFit='cover'
                width={500}
                height={500}
                className='rounded-lg max-h-72 object-cover'
              />
            )}

            <Link href={href} className='mt-5 flex flex-col'>
              <p className='text-gray-800 font-bold text-lg'>{name}</p>

              <span className='inline-block mt-2 text-gray-600'>Shop now</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

const FeaturesListSkeleton = () => {
  return (
    <>
      {[...Array(3).keys()].map((key) => {
        return (
          <div key={key}>
            <Skeleton className='rounded-lg w-96 h-72' />

            <Skeleton className='rounded-lg h-4 w-3/4 mt-5' />

            <Skeleton className='rounded-lg h-4 w-1/4 mt-3' />
          </div>
        );
      })}
    </>
  );
};

export const NavBarCategoryDropdownFeatures = ({
  className,
  categoryId,
}: NavBarCategoryDropdownFeatures) => {
  return (
    <ul className={cn('grid grid-cols-3 gap-10', className)}>
      {/* <FeaturesListSkeleton /> */}
      <Suspense fallback={FeaturesListSkeleton()}>
        <FeaturesList categoryId={categoryId} />
      </Suspense>
    </ul>
  );
};
