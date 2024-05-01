import type { CollectionConfig } from 'payload/types';

import { ProductStatus } from '@/consts/product-status';

import { isAdmin } from '../../access';
import { addUser } from '../../hooks';

import { addImageUrls, addCategoryLabel, addStripeData } from './hooks';

export const Products: CollectionConfig = {
  slug: 'products',

  hooks: {
    beforeChange: [addUser, addStripeData],

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
