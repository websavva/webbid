import type {
  AfterReadHook,
  BeforeChangeHook,
  AfterDeleteHook,
} from 'payload/dist/collections/config/types';

import { stripeApi } from '#server/stripe/api';

import type { Media, Product } from '../types';
import { MediaImageSizes } from '../media';

const imageSizeNames = [
  ...MediaImageSizes.map(({ name }) => {
    return name;
  }),
  'original',
] as const;

export const addImageUrls: AfterReadHook<Product> = ({ doc: product }) => {
  const allProductImages = product.images.map(({ image }) => image) as Media[];

  const imageUrls = Object.fromEntries(
    imageSizeNames.map((imageSizeName) => {
      let urls: Array<string | null | undefined>;
      if (imageSizeName === 'original') {
        urls = allProductImages.map(({ url }) => url);
      } else {
        urls = allProductImages.map(({ sizes }) => sizes![imageSizeName]?.url);
      }

      return [imageSizeName, urls.filter(Boolean)];
    }),
  );
  return {
    ...product,
    imageUrls,
  };
};

export const addCategoryLabel: AfterReadHook<Product> = async ({
  doc: product,
  req,
}) => {
  const { category } = product;

  let categoryLabel: string = '';

  if (typeof category === 'number') {
    const foundCategory = await req.payload
      .findByID({
        collection: 'productCategories',
        id: category,
      })
      .catch(() => {
        console.warn(
          `[Products]: Product Category with id "${category}" was not found in addCategoryLabel hook`,
        );
      });

    if (foundCategory) categoryLabel = foundCategory.label;
  } else {
    categoryLabel = category.label;
  }

  return {
    ...product,
    categoryLabel,
  };
};

export const addStripeData: BeforeChangeHook<Product> = async ({
  operation,
  data: product,
}) => {
  let stripeId: string;
  let priceId: string;

  if (operation === 'create') {
    ({
      id: stripeId,
      // @ts-ignore
      default_price: priceId,
    } = await stripeApi.products.create({
      name: product.name!,
      default_price_data: {
        currency: 'USD',
        unit_amount: Math.round(product.price! * 100),
      },
    }));
  } else {
    ({
      id: stripeId,
      // @ts-ignore
      default_price: priceId,
    } = await stripeApi.products.update(product.stripeId!, {
      name: product.name!,
      default_price: product.priceId!,
    }));
  }

  return {
    ...product,
    stripeId,
    priceId,
  };
};

export const archiveStripeData: AfterDeleteHook<Product> = async ({
  doc: { stripeId, priceId },
}) => {
  if (!stripeId || !priceId) return;

  await stripeApi.products.update(stripeId, {
    active: false,
  });

  await stripeApi.prices.update(priceId, {
    active: false,
  });
};
