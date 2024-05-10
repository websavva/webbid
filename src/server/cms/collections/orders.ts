import { Access, CollectionConfig } from 'payload/types';
import type { AfterReadHook } from 'payload/dist/collections/config/types';

import { OrderStatus } from '@/consts/order-status';

import { isAdmin, mergeCollectionAccesses } from '../access';
import { addUser } from '../hooks';
import type { Order } from './types';

const isOwner: Access = (ctx) => {
  if (isAdmin(ctx)) return true;

  return {
    user: {
      equals: ctx.req.user?.id,
    },
  };
};

const addStatusFlags: AfterReadHook<Order> = ({ doc: order }) => {
  const isSuccess = order.status === OrderStatus.Success;
  const isPaid = isSuccess;
  const isCanceled = order.status === OrderStatus.Canceled;
  const isProcessing = order.status === OrderStatus.Processing;

  return {
    ...order,

    isSuccess,
    isPaid,
    isCanceled,
    isProcessing,
  };
};

export const Orders: CollectionConfig = {
  slug: 'orders',

  admin: {
    useAsTitle: 'Your Orders',
    description: 'A summary of all your orders on DigitalMarketplace.',
  },

  hooks: {
    beforeChange: [addUser],
    afterRead: [addStatusFlags],
  },

  access: {
    read: mergeCollectionAccesses(isAdmin, isOwner),
    update: isAdmin,
    delete: isAdmin,
    create: isAdmin,
  },

  fields: [
    {
      name: 'status',
      type: 'select',
      access: {
        read: isAdmin,
        create: () => false,
        update: () => false,
      },
      admin: {
        hidden: true,
      },

      options: Object.entries(OrderStatus).map(([label, value]) => ({
        label,
        value,
      })),

      defaultValue: OrderStatus.Processing,

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
