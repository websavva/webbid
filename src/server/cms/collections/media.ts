import { join } from 'path';

import type { CollectionConfig, Access } from 'payload/types';

import { isAdmin, isAuthenticated, mergeCollectionAccesses } from '../access';
import { addUser } from '../hooks';

const hasAccessToImages: Access = ({ req: { user } }) => {
  return {
    user: {
      equals: user.id,
    },
  };
};

const isAdminOrHasAccessToImages = mergeCollectionAccesses(
  isAdmin,
  hasAccessToImages,
);

export const Media: CollectionConfig = {
  slug: 'media',

  hooks: {
    beforeChange: [addUser],
  },

  access: {
    create: isAuthenticated,
    update: isAdminOrHasAccessToImages,
    delete: isAdminOrHasAccessToImages,
    read: () => true,
  },
  upload: {
    staticDir: join(process.cwd(), 'media'),

    staticURL: '/media',

    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
    ],
    mimeTypes: ['image/*'],
  },

  fields: [
    {
      name: 'user',
      type: 'relationship',
      hasMany: false,
      relationTo: 'users',
      admin: {
        condition: () => false,
      },
    },
  ],
};
