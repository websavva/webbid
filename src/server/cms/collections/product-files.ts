import { join } from 'path';

import type { Access, CollectionConfig } from 'payload/types';

import type { User } from '#server/cms/collections/types';

import { addUser } from '../hooks';
import { isAdmin, mergeCollectionAccesses } from '../access';

const isOwnerOrPurchased: Access = async ({ req }) => {
  const user = req.user as User;

  const { docs: products } = await req.payload.find({
    collection: 'products',
    depth: 0,
    where: {
      user: {
        equals: user.id,
      },
    },
  });

  const ownProductFileIds = products.map((prod) => prod.productFile).flat();

  const { docs: orders } = await req.payload.find({
    collection: 'orders',
    depth: 2,
    where: {
      user: {
        equals: user.id,
      },
    },
  });

  const purchasedProductFileIds = orders
    .map((order) => {
      return order.products.map((product) => {
        if (typeof product === 'number')
          return req.payload.logger.error(
            'Search depth is not sufficient to find purchased file IDs',
          );

        return typeof product.productFile === 'number'
          ? product.productFile
          : product.productFile.id;
      });
    })
    .filter(Boolean)
    .flat();

  return {
    id: {
      in: [...ownProductFileIds, ...purchasedProductFileIds],
    },
  };
};

export const ProductFiles: CollectionConfig = {
  slug: 'productFiles',
  admin: {
    hidden: ({ user }) => user.role !== 'admin',
  },
  hooks: {
    beforeChange: [addUser],
  },
  access: {
    read: mergeCollectionAccesses(isAdmin, isOwnerOrPurchased),
    update: isAdmin,
    delete: isAdmin,
  },
  upload: {
    staticURL: '/product_files',
    staticDir: join(process.cwd(), 'product_files'),
    // mimeTypes: ['image/*', 'font/*', 'application/postscript', 'text/plain'],
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        condition: () => false,
      },
      hasMany: false,
      required: true,
    },
  ],
};
