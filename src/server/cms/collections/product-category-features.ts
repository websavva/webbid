import { CollectionConfig } from 'payload/types';

import { isAdmin } from '../access';

export const ProductCategoryFeatures: CollectionConfig = {
  slug: 'productCategoryFeatures',
  access: {
    read: () => true,
    update: isAdmin,
    delete: isAdmin,
  },

  admin: {
    useAsTitle: 'name'
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      required: true,
      maxLength: 55,
    },
    {
      name: 'href',
      type: 'text',
      label: 'Link',
      required: true,
      maxLength: 255,
    },

    {
      name: 'category',
      type: 'relationship',
      relationTo: 'productCategories',
      required: true,
    },

    {
      name: 'externalImageUrl',
      type: 'text',
      label: 'External Image URL',
    },

    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
};
