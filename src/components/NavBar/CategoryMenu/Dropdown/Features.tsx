'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Skeleton } from '@/components/UI/Skeleton';
import { trpcClient } from '@/lib/trpc';
import type { DefineProps } from '@/types';
import { cn } from '@/lib/utils/cn';
import type { ProductCategoryFeature } from '#server/cms/collections/types';
import { useApi } from '@/hooks/use-api';

export type NavBarCategoryDropdownFeaturesList = DefineProps<{
  features: ProductCategoryFeature[];
}>;

export type NavBarCategoryDropdownFeatures = DefineProps<{
  categoryId: number;
}>;

const FeaturesListSkeleton = () => {
  return (
    <>
      {[...Array(3).keys()].map((key) => {
        return (
          <div key={key}>
            <Skeleton className='rounded-lg h-48' />

            <Skeleton className='rounded-lg h-4 w-3/4 mt-5' />

            <Skeleton className='rounded-lg h-4 w-1/4 mt-3' />
          </div>
        );
      })}
    </>
  );
};
const FeaturesList = ({ features }: NavBarCategoryDropdownFeaturesList) => {
  return (
    <>
      {features.map(({ name, href, image }) => {
        let derivedImageUrl: string | null = null;

        if (image && typeof image === 'object') {
          derivedImageUrl = image.url!;
        }

        return (
          <li key={name} className='animate-in fade-in-0'>
            <Link href={href}>
              {derivedImageUrl && (
                <Image
                  src={derivedImageUrl}
                  alt=''
                  width={500}
                  height={500}
                  className='rounded-lg h-48 object-cover'
                />
              )}

              <div className='mt-5 flex flex-col'>
                <p className='text-gray-800 font-bold text-lg'>{name}</p>

                <span className='inline-block mt-2 text-gray-600'>
                  Shop now
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </>
  );
};

export const NavBarCategoryDropdownFeatures = ({
  className,
  categoryId,
}: NavBarCategoryDropdownFeatures) => {
  const {
    makeApiCall,
    isSuccess,
    data: features,
  } = useApi(async () => {
    const { docs: features } =
      await trpcClient.products.categories.getCategoryFeatures.query({
        perPage: 3,
        categoryId,
      });

    return features;
  });

  useEffect(() => {
    makeApiCall();
  }, [categoryId]);

  return (
    <ul className={cn('grid sm:grid-cols-3 gap-10 w-full', className)}>
      {isSuccess ? (
        <FeaturesList features={features} />
      ) : (
        <FeaturesListSkeleton />
      )}
    </ul>
  );
};
