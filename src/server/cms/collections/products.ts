import type { CollectionConfig } from 'payload/types';
import type { AfterReadHook } from 'payload/dist/collections/config/types';

import { ProductStatus } from '@/consts/product-status';
import type { Product } from './types';

import { isAdmin } from '../access';
import { addUser } from '../hooks';

const addImageUrls: AfterReadHook<Product> = ({ doc: product }) => {
  const imageUrls = product.images
    .map(({ image }) => {
      if (typeof image === 'object' && image.url) {
        return image.url!;
      } else {
        return null;
      }
    })
    .filter(Boolean) as string[];

  return {
    ...product,
    imageUrls,
  };
};

const addCategoryLabel: AfterReadHook<Product> = async ({
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
          `[Products]: Product Category with id "${category}" was not found in addCategoryLabel hook`
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

export const Products: CollectionConfig = {
  slug: 'products',

  hooks: {
    beforeChange: [addUser],

    afterRead: [addImageUrls, addCategoryLabel],
  },

  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Product details',
    },
    {
      name: 'price',
      label: 'Price in USD',
      min: 0,
      max: 1000,
      type: 'number',
      required: true,
    },
    {
      name: 'category',
      label: 'Category',
      type: 'relationship',
      relationTo: 'productCategories',
      required: true,
      hasMany: false,
    },
    {
      name: 'productFile',
      label: 'Product File',
      type: 'relationship',
      required: true,
      relationTo: 'productFiles',
      hasMany: false,
    },
    {
      name: 'approvedForSale',
      label: 'Product Status',
      type: 'select',
      defaultValue: ProductStatus.Pending,
      access: {
        create: isAdmin,
        read: isAdmin,
        update: isAdmin,
      },
      options: Object.entries(ProductStatus).map(([label, value]) => ({
        label,
        value,
      })),
    },
    {
      name: 'priceId',
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'stripeId',
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'images',
      type: 'array',
      label: 'Product images',
      minRows: 1,
      maxRows: 4,
      required: true,
      labels: {
        singular: 'Image',
        plural: 'Images',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
};
