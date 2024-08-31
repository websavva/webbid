import type { CollectionConfig } from 'payload/types';

import { isAdmin } from '../access';

export const ProductCategories: CollectionConfig = {
  slug: 'productCategories',
  access: {
    read: () => true,
    update: isAdmin,
    delete: isAdmin,
  },

  admin: {
    useAsTitle: 'label',
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      unique: true,
      label: 'Name',
      required: true,
      maxLength: 80,
    },
    {
      name: 'label',
      type: 'text',
      label: 'Label',
      required: true,
      maxLength: 80,
    },
  ],
};
