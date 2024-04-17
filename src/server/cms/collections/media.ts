import { join } from 'path';

import type { CollectionConfig, Access } from 'payload/types';

import { Role } from '@/consts/roles';

const isAdminOrHasAccessToImages: Access = ({ req: { user } }) => {
  if (!user || user.role !== Role.Admin) return false;

  return {
    user: {
      equals: user.id,
    },
  };
};

export const Media: CollectionConfig = {
  slug: 'media',

  hooks: {
    beforeChange: [
      ({ req, data }) => {
        return {
          ...data,
          user: req.user.id,
        };
      },
    ],
  },

  access: {
    create: isAdminOrHasAccessToImages,
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
    },
  ],
};
