import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CheckIcon, ShieldIcon } from 'lucide-react';

import { trpcClient } from '@/lib/trpc';
import type { PagePropsWithParams } from '@/types/page-props';

import type { BreadcrumbItem } from '@/components/UI/Breadcrumbs';
import { Breadcrumbs } from '@/components/UI/Breadcrumbs';
import { ImageSlider } from '@/components/ImageSlider';
import { formatPrice } from '@/lib/formatters';
import { ProductReels } from '@/components/ProductReels';
import { CartButton } from '@/components/CartButton';
import { ArrowLink } from '@/components/UI/ArrowLink';

const breadcrumbItems: BreadcrumbItem[] = [
  {
    href: '/',
    name: 'Home',
  },
  {
    name: 'Products',
  },
];

const ProductReelsEmptyPlaceholder = () => (
  <div className='text-sm font-medium text-gray-500'>
    No similar products were found...
  </div>
);

type ProductPageProps = PagePropsWithParams<{
  id: string;
}>;

export async function generateMetadata({
  params: { id: productId },
}: ProductPageProps): Promise<Metadata> {
  try {
    const { name: title, description = '' } =
      (await trpcClient.products.getProductById.query(+productId))!;

    return {
      title,
      description,
    };
  } catch {
    return {
      title: 'Product',
      description: '',
    };
  }
}

export default async function ProductPage({
  params: { id: rawProductId },
}: ProductPageProps) {
  const productId = +rawProductId;

  // id validation
  if (isNaN(productId)) notFound();

  const product = await trpcClient.products.getProductById.query(productId);

  if (!product) notFound();

  const {
    name: title,
    price,
    category,
    description,
    imageUrls,
    categoryLabel,
  } = product;

  let similarProductsLabel: string;
  let similarProductsHref = '/products';
  let categoryName: string | undefined;

  if (typeof category === 'object') {
    ({ name: categoryName } = category);

    similarProductsLabel = categoryLabel || 'Products';
    similarProductsHref += `?category=${categoryName}`;
  } else {
    similarProductsLabel = 'Products';
  }

  return (
    <div>
      <section className='grid grid-cols-1 gap-14 lg:grid-cols-[repeat(2,1fr)]'>
        <div>
          <Breadcrumbs items={breadcrumbItems} className='text-gray-600' />

          <h1 className='mt-6 text-3xl font-bold'>{title}</h1>

          <div className='mt-6 flex items-center'>
            <span className='mr-4 text-lg font-semibold'>
              {formatPrice(price)}
            </span>

            {categoryLabel && (
              <span className='border-l-2 border-gray-400 pl-4 text-gray-600'>
                {categoryLabel}
              </span>
            )}
          </div>

          <div className='mt-5 flex items-center text-sm font-medium text-gray-500'>
            <CheckIcon className='mr-2 size-[1.5em] text-green-600' />
            Eligible for instant delivery
          </div>

          <p className='mt-8 leading-relaxed text-gray-600'>
            {description || 'No description yet...'}
          </p>

          <CartButton product={product} className='mt-16 w-full' />

          <div className='mt-8 flex items-center justify-center text-sm text-gray-500'>
            <ShieldIcon className='mr-2' />
            30 Days Return Guarantee
          </div>
        </div>

        <ImageSlider
          imageUrls={imageUrls}
          className='max-h-[400px] max-lg:row-start-1 max-lg:row-end-2 lg:max-h-[700px]'
        />
      </section>

      <section className='mt-16 lg:mt-28'>
        <div className='mb-12 flex max-sm:flex-col max-sm:space-y-3 sm:items-center sm:justify-between'>
          <div>
            <h2 className='mb-3 text-2xl font-bold capitalize'>
              Similar {similarProductsLabel}
            </h2>

            <span className='text-sm font-medium text-gray-500'>
              Browse similar {similarProductsLabel} just like &quot;{title}
              &quot;
            </span>
          </div>

          <ArrowLink href={similarProductsHref}>Shop the collection</ArrowLink>
        </div>

        <ProductReels
          count={4}
          category={categoryName}
          except={[productId]}
          EmptyPlaceholder={ProductReelsEmptyPlaceholder}
          className='grid-cols-1 gap-x-16 gap-y-10 sm:grid-cols-[repeat(auto-fit,minmax(17rem,1fr))]'
        />
      </section>
    </div>
  );
}
