import { notFound } from 'next/navigation';
import { CheckIcon, ShieldIcon } from 'lucide-react';

import { trpcClient } from '@/lib/trpc';
import type { PagePropsWithParams } from '@/types/page-props';

import { BreadcrumbItem, Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ImageSlider } from '@/components/ImageSlider';
import { Container } from '@/components/ui/Container';
import { formatPrice } from '@/lib/formatters';
import { ProductReels } from '@/components/ProductReels';
import { CartButton } from '@/components/CartButton';
import { ArrowLink } from '@/components/ui/ArrowLink';

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
  <div className='text-gray-500 text-sm font-medium'>
    No similar products were found...
  </div>
);

export default async function ProductPage({
  params: { id: rawProductId },
}: PagePropsWithParams<{
  id: string;
}>) {
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
    <Container className='py-16 mx-auto'>
      <section className='grid grid-cols-[repeat(2,1fr)] gap-14'>
        <div>
          <Breadcrumbs items={breadcrumbItems} className='text-gray-600' />

          <h1 className='mt-6 text-3xl font-bold'>{title}</h1>

          <div className='flex items-center mt-6'>
            <span className='font-semibold mr-4 text-lg'>
              {formatPrice(price)}
            </span>

            {categoryLabel && (
              <span className='text-gray-600 border-l-2 border-gray-400 pl-4'>
                {categoryLabel}
              </span>
            )}
          </div>

          <div className='mt-5 flex items-center text-gray-500 font-medium text-sm'>
            <CheckIcon className='text-green-600 size-[1.5em] mr-2' />
            Eligible for instant delivery
          </div>

          <p className='text-gray-600 mt-8 leading-relaxed'>
            {description || 'No description yet...'}
          </p>

          <CartButton product={product} className='w-full mt-16' />

          <div className='flex items-center justify-center mt-8 text-sm text-gray-500'>
            <ShieldIcon className='mr-2' />
            30 Days Return Guarantee
          </div>
        </div>

        <ImageSlider imageUrls={imageUrls} className='max-h-[700px]' />
      </section>

      <section className='mt-28'>
        <div className='flex justify-between items-center mb-12'>
          <div>
            <h2 className='capitalize mb-3 font-bold text-2xl'>
              Similar {similarProductsLabel}
            </h2>

            <span className='text-gray-500 font-medium text-sm'>
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
          className='gap-16'
        />
      </section>
    </Container>
  );
}
