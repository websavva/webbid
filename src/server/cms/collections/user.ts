import type { CollectionConfig } from 'payload/types';

export const User: CollectionConfig = {
  slug: 'users',

  auth: {
    verify: {
      generateEmailHTML({ user }) {
        return `<p>${user.email}</p>`;
      },
    },
  },

  access: {
    read: () => true,
    create: () => true,
  },

  fields: [
    {
      type: 'select',
      name: 'role',
      defaultValue: 'user',
      required: true,
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'user',
          value: 'user',
        },
      ],
    },
  ],
};
