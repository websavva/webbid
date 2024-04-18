import { Access, CollectionConfig } from 'payload/types';

import { isAdmin } from '../access';

const isOwner: Access = (ctx) => {
  if (isAdmin(ctx)) return true;

  return {
    user: {
      equals: ctx.req.user?.id,
    },
  };
};

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'Your Orders',
    description: 'A summary of all your orders on DigitalMarketplace.',
  },
  access: {
    read: isOwner,
    update: isAdmin,
    delete: isAdmin,
    create: isAdmin,
  },
  fields: [
    {
      name: '_isPaid',
      type: 'checkbox',
      access: {
        read: isAdmin,
        create: () => false,
        update: () => false,
      },
      admin: {
        hidden: true,
      },
      required: true,
    },
    {
      name: 'user',
      type: 'relationship',
      admin: {
        hidden: true,
      },
      relationTo: 'users',
      hasMany: false,
      required: true,
    },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      required: true,
      hasMany: true,
    },
  ],
};
