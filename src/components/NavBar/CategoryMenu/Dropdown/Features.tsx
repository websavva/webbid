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
            <Skeleton className='h-48 rounded-lg' />

            <Skeleton className='mt-5 h-4 w-3/4 rounded-lg' />

            <Skeleton className='mt-3 h-4 w-1/4 rounded-lg' />
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

        if (image && typeof image === 'object' && image.sizes?.card?.url) {
          derivedImageUrl = image.sizes.card.url;
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
                  className='h-48 rounded-lg object-cover'
                />
              )}

              <div className='mt-5 flex flex-col'>
                <p className='text-lg font-bold text-gray-800'>{name}</p>

                <span className='mt-2 inline-block text-gray-600'>
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
    <ul className={cn('grid w-full gap-10 sm:grid-cols-3', className)}>
      {isSuccess ? (
        <FeaturesList features={features} />
      ) : (
        <FeaturesListSkeleton />
      )}
    </ul>
  );
};
